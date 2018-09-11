import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { IResolvers } from "graphql-yoga/dist/types";

export const resolvers: IResolvers = {
  MyDateTime: new GraphQLScalarType({
    name: "MyDateTime",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  }) as any,
  Query: {
    currentDate: () => new Date()
  }
};
