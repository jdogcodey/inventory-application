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

async function searchBar(searchTerm) {
  const { rows } = await pool.query(
    `
        (
    SELECT 
        'book' AS type, 
        b.name AS match_name
    FROM books b
    WHERE b.name ILIKE '%' || $1 || '%'
)
UNION ALL
(
    SELECT 
        'author' AS type, 
        a.first_name || ' ' || a.last_name AS match_name
    FROM authors a
    WHERE a.first_name ILIKE '%' || $1 || '%' 
       OR a.last_name ILIKE '%' || $1 || '%'
)
UNION ALL
(
    SELECT 
        'genre' AS type, 
        g.name AS match_name
    FROM genres g
    WHERE g.name ILIKE '%' || $1 || '%'
)
LIMIT 10 OFFSET 0;
`,
    [searchTerm]
  );
  return rows;
}

async function addBook(title, genreId, price, noOfPages, authorId) {
  await pool.query(
    `INSERT INTO books (name, genre_id, price, no_of_pages, author_id)
        VALUES ($1, $2, $3, $4, $5);`,
    [title, genreId, price, noOfPages, authorId]
  );
}

async function addAuthor(firstName, lastName) {
  await pool.query(
    `INSERT INTO authors (first_name, last_name)
        VALUES ($1, $2)`,
    [firstName, lastName]
  );
}

async function addGenre(genre) {
  await pool.query(
    `INSERT INTO genres (name)
        VALUES ($1)`,
    [genre]
  );
}

async function getBookId(bookName) {
  const { rows } = await pool.query(
    `SELECT id FROM books WHERE name ILIKE $1`,
    [`%${bookName}%`]
  );
  return rows;
}

async function getAuthorId(firstName, lastName) {
  const { rows } = await pool.query(
    `SELECT id FROM authors WHERE first_name ILIKE $1 AND last_name ILIKE $2`,
    [`%${firstName}%`, `%${lastName}%`]
  );
  return rows;
}

async function getGenreId(genre) {
  const { rows } = await pool.query(
    `SELECT id FROM genres WHERE name ILIKE $1`,
    [`%${genre}%`]
  );
  return rows;
}
