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
