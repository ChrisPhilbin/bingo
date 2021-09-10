import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";
import generateGameSlug from "../utils/generateGameSlug";

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
  async createGame(parent, args, { prisma, request }, info) {
    const userId = await getUserId(request);
    const slug = await generateGameSlug();

    const game = await prisma.mutation.createGame(
      {
        data: {
          slug: slug,
          title: args.data.title,
          published: args.data.published,
          finished: args.data.finished,
          host: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
    return game;
  },
  async updateGame(parent, args, { prisma, request }, info) {
    const userId = await getUserId(request);

    const gameExists = await prisma.exists.Game({
      id: args.id,
      host: {
        id: userId,
      },
    });

    if (!gameExists) {
      throw new Error("Cannot edit game.");
    }

    return prisma.mutation.updateGame(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  async deleteGame(parent, args, { prisma, request }, info) {
    const userId = await getUserId(request);

    const gameExists = await prisma.exists.Game({
      id: args.id,
      host: {
        id: userId,
      },
    });

    if (!gameExists) {
      throw new Error("Unable to delete game.");
    }

    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

export { Mutation as default };
