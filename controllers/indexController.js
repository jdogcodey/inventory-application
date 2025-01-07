const db = require(`../db/queries`);

async function renderHomepage(req, res) {
  const allBooks = await db.getAllBooksWithGenreAuthor();
  res.render(`../views/index`, { allBooks: allBooks });
}

async function allGenres(req, res) {
  const genres = await db.getAllGenres();
  res.render("../views/genres", { genres: genres });
}

async function allAuthors(req, res) {
  const authors = await db.getAllAuthors();
  res.render("../views/authors", { authors: authors });
}

// Add controllers for the different routes

module.exports = { renderHomepage, allGenres, allAuthors };
