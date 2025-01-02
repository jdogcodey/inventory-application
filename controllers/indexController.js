const db = require(`../db/queries`);

async function renderHomepage(req, res) {
  const allBooks = await db.getAllBooksWithGenreAuthor();
  res.render(`../views/index`, { allBooks: allBooks });
}
