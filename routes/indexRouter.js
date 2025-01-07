const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

// Add route for a genre
// Add route for an author
//Add search route
//Add post for new genre
//Add post for new author
//Add post for new book

indexRouter.get("/authors", indexController.allAuthors);
indexRouter.get("/genres", indexController.allGenres);
indexRouter.get("/", indexController.renderHomepage);

module.exports = indexRouter;
