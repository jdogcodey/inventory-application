const pool = require("./pool");

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books;");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres;");
  return rows;
}

async function getAllAuthors() {
  const { rows } = await pool.query("SELECT * FROM authors;");
  return rows;
}

async function getBookById(id) {
  const { rows } = await pool.query("SELECT * FROM  books WHERE id = ($1)", [
    id,
  ]);
  return rows;
}
