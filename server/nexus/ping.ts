import { subscriptionType } from "nexus";

export const PingSubscription = subscriptionType({
  definition(t) {
    t.string("ping", {
      subscribe: (_root, _args, { pubsub }) => {
        return pubsub.asyncIterator(["ping"]);
      },
      resolve(data: { ping: string }) {
        return data.ping;
      },
    });
  },
});
