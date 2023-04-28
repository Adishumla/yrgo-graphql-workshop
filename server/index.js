import { ApolloServerPluginLandingPageGraphQLPlayground as Playground } from "apollo-server-core";
import { connectToDb } from "./db/db.js";
import { ApolloServer, gql } from "apollo-server";
import { schema } from "./graphql/schema.js";

async function initServer() {
  try {
    await connectToDb();
    const server = new ApolloServer({
      schema,
      plugins: [Playground],
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

initServer();
