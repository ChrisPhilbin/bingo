import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";
import generateGameSlug from "../utils/generateGameSlug";
import { defaultMatches } from "../utils/gameDefaultBoard";
import updateBoards from "../utils/updateBoards";
import findDuplicates from "../utils/findDuplicates";

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

    const game = await prisma.query.game(
      {
        where: {
          id: args.id,
        },
      },
      info
    );

    if (!args.data.calledPhrases) {
      return prisma.mutation.updateGame(
        {
          where: {
            id: args.id,
          },
          data: {
            ...args.data,
          },
        },
        info
      );
    }

    if (!game.finished) {
      const winners = updateBoards(
        game.players,
        args.data.calledPhrases.toLowerCase(),
        prisma
      );

      let isGameFinished =
        winners.length >= 1
          ? true
          : false || game.calledPhrases.length === 24
          ? true
          : false;

      const updatedGame = await prisma.mutation.updateGame(
        {
          where: {
            id: args.id,
          },
          data: {
            ...args.data,
            finished: isGameFinished,
            calledPhrases: {
              set: [
                ...game.calledPhrases,
                args.data.calledPhrases.toLowerCase(),
              ],
            },
          },
        },
        info
      );

      return updatedGame;
    } else {
      throw new Error("Game is finshed!");
    }
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

    return prisma.mutation.deleteGame(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createPlayer(parent, args, { prisma, request }, info) {
    const gameExists = await prisma.exists.Game({
      slug: args.slug,
      published: true,
      finished: false,
    });

    if (!gameExists) {
      throw new Error("Unable to find game.");
    }

    if (args.data.board.length !== 25) {
      throw new Error("Board must contain 25 phrases.");
    }

    let duplicatesPresent = await findDuplicates(args.data.board);

    if (duplicatesPresent) {
      throw new Error("Board must have only unique phrases");
    }

    return prisma.mutation.createPlayer(
      {
        data: {
          matches: {
            set: defaultMatches,
          },
          nickname: args.data.nickname,
          board: {
            set: args.data.board,
          },
          game: {
            connect: {
              slug: args.slug,
            },
          },
        },
      },
      info
    );
  },
  async deletePlayer(parent, args, { prisma, request }, info) {
    const playerExists = await prisma.exists.Player({
      id: args.id,
    });

    if (!playerExists) {
      throw new Error("Cannot delete player.");
    }

    return prisma.mutation.deletePlayer(
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
