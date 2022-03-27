import { defineHandle, useBody, useQuery } from "h3";
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import type { Context } from "../context";
import { contextFactory } from "../context";
import { getTokenFromHeaders } from "../../utils/jwt";
import schema from "../schema";
import config from "#config";

export default defineHandle(async (req, res) => {
  // Construct GraphQL request
  const request = {
    body: req.method !== "GET" && (await useBody(req)),
    headers: req.headers,
    method: req.method || "GET",
    query: useQuery(req),
  };

  // Render GraphiQL in development only
  if (process.env.NODE_ENV === "development" && shouldRenderGraphiQL(request)) {
    const subscriptionsEndpoint = config.graphqlApiURL.replace("http", "ws");
    return renderGraphiQL({ endpoint: "/api/graphql", subscriptionsEndpoint });
  }

  // Process GraphQL request and send result
  const { operationName, query, variables } = getGraphQLParameters(request);
  const result = await processRequest<Context>({
    operationName,
    query,
    variables,
    request,
    schema,
    contextFactory: ({ request }) => contextFactory(getTokenFromHeaders(request.headers as { cookie?: string })),
  });
  sendResult(result, res);
});
