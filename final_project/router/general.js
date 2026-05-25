const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user (username/password empty)."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve) => {
      resolve(books);
    });
    const booksList = await getBooks;
    return res.status(200).send(JSON.stringify(booksList, null, 4));
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const getBook = new Promise((resolve, reject) => {
      if (books[isbn]) {
        resolve(books[isbn]);
      } else {
        reject("Book not found");
      }
    });
    const book = await getBook;
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({message: error});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author.toLowerCase();
  try {
    const getBooksByAuthor = new Promise((resolve, reject) => {
      let filteredBooks = {};
      const keys = Object.keys(books);
      keys.forEach(key => {
        if (books[key].author.toLowerCase() === author) {
          filteredBooks[key] = books[key];
        }
      });
      if (Object.keys(filteredBooks).length > 0) {
        resolve(filteredBooks);
      } else {
        reject("No books found by this author");
      }
    });
    const result = await getBooksByAuthor;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({message: error});
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title.toLowerCase();
  try {
    const getBooksByTitle = new Promise((resolve, reject) => {
      let filteredBooks = {};
      const keys = Object.keys(books);
      keys.forEach(key => {
        if (books[key].title.toLowerCase() === title) {
          filteredBooks[key] = books[key];
        }
      });
      if (Object.keys(filteredBooks).length > 0) {
        resolve(filteredBooks);
      } else {
        reject("No books found with this title");
      }
    });
    const result = await getBooksByTitle;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({message: error});
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
