import { Books, Author } from "../../db/models/index.js";

export const bookResolver = {
  Query: {
    books: async () => {
      const books = await Books.find().populate("author");
      return books;
    },
    book: async (_, { _id }) => {
      const book = await Books.findById(_id).populate("author");
      return book;
    },
  },
  Mutation: {
    addBook: async (_, { title, authorId }) => {
      if (title === "") {
        return {
          success: false,
          message: "Title cannot be empty",
        };
      }
      const book = await Books.create({
        title,
        author: authorId,
      });
      if (book) {
        const authorDoc = await Author.findById(authorId);
        if (authorDoc) {
          authorDoc.books.push(book._id);
          await authorDoc.save();
        }
        return {
          success: true,
          message: "Book added successfully",
        };
      } else {
        return {
          success: false,
          message: "Something went wrong. Book not added!",
        };
      }
    },
    removeBook: async (_, { _id }) => {
      const book = await Books.deleteOne({ _id });
      if (book) {
        return {
          success: true,
          message: "Book removed successfully",
        };
      } else {
        return {
          success: false,
          message: "Something went wrong. Book not removed!",
        };
      }
    },
  },
};

// books
// const books = await Books.find().populate("author");
// return books;

// -------------

// book
// const book = await Books.findById(_id).populate("author");
// return book;

// -------------

// addBook
// if (title === "") {
//   return {
//     success: false,
//     message: "Title cannot be empty",
//   };
// }
// const book = await Books.create({
//   title,
//   author: authorId,
// });
// if (book) {
//   const authorDoc = await Author.findById(authorId);
//   if (authorDoc) {
//     authorDoc.books.push(book._id);
//     await authorDoc.save();
//   }
//   return {
//     success: true,
//     message: "Book added successfully",
//   };
// } else {
//   return {
//     success: false,
//     message: "Something went wrong. Book not added!",
//   };
// }

// -------------

// removeBook
// const book = await Books.deleteOne({ _id });
// if (book) {
//   return {
//     success: true,
//     message: "Book removed successfully",
//   };
// } else {
//   return {
//     success: false,
//     message: "Something went wrong. Book not removed!",
//   };
// }
