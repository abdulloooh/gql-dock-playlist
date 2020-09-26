const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
const books = [
  { name: "Name of the wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

/**
 * first part of schema is to define all individual models
 * then the relationship
 * then define all RootQueries
 *
 * We only have a single model here which is book and no relationship yet
 */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

/**
 * Root RootQueries for instance include
 * Books
 * Book (that is individual)
 * Authors
 * Author
 */
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //logic to fetch data from db / other source
        return _.find(books, { id: args.id });
      },
    },
  },
});

/**
 * So the query for book will be something like
 * book(id:"123"){
 *  name
 *  genre
 * }
 */

module.exports = new GraphQLSchema({
  query: RootQuery,
});
