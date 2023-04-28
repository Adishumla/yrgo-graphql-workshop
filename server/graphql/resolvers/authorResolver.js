import { Author } from "../../db/models/index.js";

export const authorResolver = {
  Query: {
    authors: async () => {
      const authors = await Author.find().populate("books");
      return authors;
    },
    author: async (_, { _id }) => {
      const author = await Author.findById(_id).populate("books");
      return author;
    },
  },
  Mutation: {
    addAuthor: async (_, { name, books }) => {
      const author = await Author.create({
        name,
        books,
      });
      if (author) {
        return {
          success: true,
          message: "Author added successfully",
        };
      } else {
        return {
          success: false,
          message: "Something went wrong. Author not added!",
        };
      }
    },
    removeAuthor: async (_, { _id }) => {
      const author = await Author.deleteOne({ _id });
      if (author) {
        return {
          success: true,
          message: "Author removed successfully",
        };
      } else {
        return {
          success: false,
          message: "Something went wrong. Author not removed!",
        };
      }
    },
  },
};

// authors
// const authors = await Author.find().populate("books");
// return authors;

// -------------

// auhtor
// const author = await Author.findById(_id).populate("books");
// return author;

// -------------

// addAuthor
// const author = await Author.create({
//   name,
//   books,
// });
// if (author) {
//   return {
//     success: true,
//     message: "Author added successfully",
//   };
// } else {
//   return {
//     success: false,
//     message: "Something went wrong. Author not added!",
//   };
// }

// -------------

// removeAuthor
// const author = await Author.deleteOne({ _id });
// if (author) {
//   return {
//     success: true,
//     message: "Author removed successfully",
//   };
// } else {
//   return {
//     success: false,
//     message: "Something went wrong. Author not removed!",
//   };
// }
