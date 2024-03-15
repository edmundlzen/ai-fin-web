import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${
      typeof window !== "undefined"
        ? window.localStorage.getItem("access_token")
        : ""
    }`,
  },
});

export default client;
