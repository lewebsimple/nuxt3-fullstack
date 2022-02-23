import { resolve } from "pathe";
import { GraphQLSchema } from "graphql";
import { makeSchema } from "nexus";
import * as types from "./nexus/_types";

export default makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  outputs: {
    schema: resolve(process.cwd(), "generated/schema.graphql"),
    typegen: resolve(process.cwd(), "generated/nexus-types.ts"),
  },
}) as unknown as GraphQLSchema;
