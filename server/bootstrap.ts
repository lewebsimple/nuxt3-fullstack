import { Server } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { execute, subscribe } from "graphql";
import { getTokenFromHeaders } from "../utils/jwt";
import schema from "./schema";
import { pubsub } from "./pubsub";
import { contextFactory } from "./context";

export async function initialize(server: Server) {
  console.log("Initializing...");

  // Configure graphql-ws
  const wsServer = new WebSocketServer({ server, path: "/api/graphql" });
  useServer(
    {
      schema,
      execute,
      subscribe,
      context: ({ extra }) => contextFactory(getTokenFromHeaders(extra.request.headers as { cookie?: string })),
    },
    wsServer,
  );

  // Ping every 3000ms
  setInterval(() => pubsub.publish("ping", { ping: `Ping ${Math.random()}` }), 3000);
}
