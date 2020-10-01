import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, getBookQuery, addBookMutation };
