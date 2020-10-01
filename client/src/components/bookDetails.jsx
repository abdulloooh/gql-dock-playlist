import React, { Component } from "react";
import { graphql } from "react-apollo";

import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    const { book } = this.props.data;
    if (!book) return <div>No Book Selected</div>;
    return (
      <div>
        <h2>Name: {book.name}</h2>
        <p>Genre: {book.genre}</p>
        <p>Author: {book.author.name}</p>
        <p>All Books by this Author</p>
        <ul className="other-books">
          {book.author.books.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div id="book-details">
        <h3>Book Details</h3>
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: { id: props.bookId },
    };
  },
})(BookDetails);
