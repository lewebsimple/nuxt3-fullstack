import { DocumentNode } from "graphql";
import * as Urql from "@urql/vue";
import * as Types from "../generated/schema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  ping?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["Int"];
  role: UserRole;
};

export enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Guest = "GUEST",
  Unverified = "UNVERIFIED",
}

export type PingSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type PingSubscription = { __typename?: "Subscription"; ping?: string | null };

export const PingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "Ping" },
      selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "ping" } }] },
    },
  ],
} as unknown as DocumentNode;

export function usePingSubscription<R = PingSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<never, PingSubscriptionVariables>, "query"> = {},
  handler?: Urql.SubscriptionHandlerArg<PingSubscription, R>,
) {
  return Urql.useSubscription<PingSubscription, R, PingSubscriptionVariables>(
    { query: PingDocument, ...options },
    handler,
  );
}
