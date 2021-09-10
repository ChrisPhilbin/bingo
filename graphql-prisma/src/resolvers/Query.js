import getUserId from "../utils/getUserId";

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId,
      },
    });
  },
  async games(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return await prisma.query.games(
      {
        where: {
          host: {
            id: userId,
          },
        },
      },
      info
    );
  },
  async game(parent, args, { prisma, request }, info) {
    if (!args.query) {
      throw new Error("Must provide query string.");
    }

    return await prisma.query.game(
      {
        where: {
          id: args.query,
        },
      },
      info
    );
  },
};

export { Query as default };
