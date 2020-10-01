import React, { Component } from "react";
import { graphql } from "react-apollo";
import BookDetails from "./bookDetails";

import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  state = { selected: "" };

  displayBooks() {
    if (this.props.data.loading) return <div>Fetching list of Books...</div>;
    return this.props.data.books.map((book) => (
      <li onClick={(e) => this.setState({ selected: book.id })} key={book.id}>
        {book.name}
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
