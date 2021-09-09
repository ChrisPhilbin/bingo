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

    return await prisma.query.games({
      where: {
        host: userId,
      },
    });
  },
  async game(parent, args, { prisma, request }, info) {
    return await prisma.query.game({
      where: {
        slug: request,
      },
    });
  },
};

export { Query as default };