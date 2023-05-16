// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://graphql-prototype.gss-data.org.uk/api",
  cache: new InMemoryCache(),
  onError: (error) => {
    console.log("ApolloError: Failed to fetch", error);
  },
});

export default client;
