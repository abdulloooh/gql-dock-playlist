const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  "mongodb://localhost/graphql",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to mongodb successfully...");
  }
);

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 4000;
app.listen(4000, () => console.log(`Listening on port ${PORT}`));
