const db = require(`../db/queries`);

async function renderHomepage(req, res) {
  const allBooks = await db.getAllBooksWithGenreAuthor();
  res.render(`../views/index`, { allBooks: allBooks });
}

async function allGenres(req, res) {
  const allGenres = await db.getAllGenres();
  res.render("../views/genres", { allGenres: allGenres });
}

// Add controllers for the different routes

module.exports = { renderHomepage, allGenres };
