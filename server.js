import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const people = ["alex", "bob"];

const typeDefs = `
  type Query {
    people: [String]
  }

  type Mutation {
    addPerson(name: String): [String]
  }
`;

const resolvers = {
  Query: {
    people: () => people,
  },
  Mutation: {
    addPerson(_, { name }) {
      people.push(name);
      return people;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
