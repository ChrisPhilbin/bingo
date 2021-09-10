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
    if (!args.id) {
      throw new Error("Must provide query.");
    }

    const opArgs = {
      where: {
        id: args.id,
      },
    };

    return await prisma.query.game(opArgs, info);
  },
  async gameBySlug(parent, args, { prisma, request }, info) {
    if (!args.slug) {
      throw new Error("Must provide slug");
    }

    const opArgs = {
      where: {
        slug: args.slug,
      },
    };

    return await prisma.query.game(opArgs, info);
  },
};

export { Query as default };
