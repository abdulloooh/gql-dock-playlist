import React from "react";

//apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import BookList from "./components/bookList";
import AddBook from "./components/addBook";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Laplace's BookList</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
