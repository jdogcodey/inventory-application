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

async function booksByGenre(req, res) {
  const genreId = req.params.genreId;
  const allBooks = await db.getAllBooksByGenre(genreId);
  const genre = await db.findGenreName(genreId);
  res.render("../views/oneGenre", { genre: genre, allBooks: allBooks });
}

async function newPage(req, res) {
  const allGenres = await db.getAllGenres();
  const allAuthors = await db.getAllAuthors();
  res.render("../views/new", { allGenres: allGenres, allAuthors: allAuthors });
}

async function addBook(req, res) {
  const title = req.body.title;
  const genre = req.body.genre;
  const price = req.body.price;
  const pages = req.body.pages;
  const author = req.body.author;
  await db.addBookToDB(title, genre, price, pages, author);
  res.redirect("/");
}

// Add controllers for the different routes

module.exports = {
  renderHomepage,
  allGenres,
  allAuthors,
  booksByGenre,
  newPage,
  addBook,
};
