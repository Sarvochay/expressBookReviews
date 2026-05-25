const axios = require('axios');

// ==========================================
// Task 10: Get all books – Using Async/Await
// ==========================================
async function getAllBooks() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log("All Books Retrieved Asynchronously:");
    console.log(JSON.stringify(response.data, null, 4));
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
  }
}

// ==========================================
// Task 11: Search by ISBN – Using Promises
// ==========================================
function searchByISBN(isbn) {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      console.log(`\nBook Details for ISBN ${isbn} Retrieved Asynchronously:`);
      console.log(JSON.stringify(response.data, null, 4));
    })
    .catch(error => {
      console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
    });
}

// ==========================================
// Task 12: Search by Author – Using Async/Await
// ==========================================
async function searchByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(`\nBooks by Author "${author}" Retrieved Asynchronously:`);
    console.log(JSON.stringify(response.data, null, 4));
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by Author "${author}":`, error.message);
  }
}

// ==========================================
// Task 13: Search by Title – Using Async/Await
// ==========================================
async function searchByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(`\nBooks with Title "${title}" Retrieved Asynchronously:`);
    console.log(JSON.stringify(response.data, null, 4));
    return response.data;
  } catch (error) {
    console.error(`Error fetching books with Title "${title}":`, error.message);
  }
}

// ==========================================
// Execution Block (Uncomment to test)
// ==========================================
// async function testAll() {
//   await getAllBooks();
//   searchByISBN("1");
//   await searchByAuthor("Unknown");
//   await searchByTitle("Fairy tales");
// }
// testAll();

module.exports = {
  getAllBooks,
  searchByISBN,
  searchByAuthor,
  searchByTitle
};
