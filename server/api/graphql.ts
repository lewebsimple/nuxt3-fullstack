import { defineHandle, useBody, useQuery } from "h3";
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import schema from "../schema";

export default defineHandle(async (req, res) => {
  // Construct GraphQL request
  const request = {
    body: req.method !== "GET" && (await useBody(req)),
    headers: req.headers,
    method: req.method || "GET",
    query: useQuery(req),
  };

  // Render GraphiQL in development only
  if (process.env.NODE_ENV === "development" && shouldRenderGraphiQL(request))
    return renderGraphiQL({ endpoint: "/api/graphql" });

  // Process GraphQL request and send result
  const { operationName, query, variables } = getGraphQLParameters(request);
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
  });
  sendResult(result, res);
});
