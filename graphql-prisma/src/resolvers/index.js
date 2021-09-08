import { extractFragmentReplacements } from "prisma-binding";
import Query from "./Query";
import Mutation from "./Mutation";
import Subscription from "./Subscription";
import User from "./User";
import Game from "./Game";
import Player from "./Player";

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
  Game,
  Player,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
