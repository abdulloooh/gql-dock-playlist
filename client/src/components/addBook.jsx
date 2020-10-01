import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

class AddBook extends Component {
  // state = { name: "", genre: "", authorId: "" };
  state = { data: { name: "", genre: "", authorId: "" } };

  displayAuthors() {
    if (this.props.getAuthorsQuery.loading)
      return <option disabled>Fetching list of Authors...</option>;
    return this.props.getAuthorsQuery.authors.map((author) => (
      <option value={author.id} key={author.id}>
        {author.name}
      </option>
    ));
  }

  handleChange({ currentTarget: input }) {
    const { name: path, value } = input;
    let data = { ...this.state.data };
    data[path] = value;
    this.setState({ data });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: { ...this.state.data },
      refetchQueries: [{ query: getBooksQuery }],
    });
    this.setState({ data: { name: "", genre: "", authorId: "" } });
  }

  render() {
    const { name, genre, authorId } = this.state.data;
    return (
      <form id="add-book" onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange.bind(this)}
            // onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            //Controlled
            value={genre}
            onChange={this.handleChange.bind(this)}
            //Uncontrolled
            // onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            name="authorId"
            value={authorId}
            onChange={this.handleChange.bind(this)}
            // onChange={(e) => this.setState({ authorId: e.target.value })}
          >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
