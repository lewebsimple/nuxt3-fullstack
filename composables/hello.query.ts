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
  hello?: Maybe<Scalars["String"]>;
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

export type HelloQueryVariables = Types.Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query"; hello?: string | null };

export const HelloDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Hello" },
      selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "hello" } }] },
    },
  ],
} as unknown as DocumentNode;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<never, HelloQueryVariables>, "query"> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
}
