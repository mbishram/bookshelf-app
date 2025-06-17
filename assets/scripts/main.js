import Bookshelf from "db/bookshelf.js";
import renderInit from "libs/render.js";
import formInit from "pages/index/form.js";
import searchInit from "pages/index/search.js";

addEventListener("DOMContentLoaded", () => {
  // Create bookshelf object
  const bookshelf = new Bookshelf();

  // Init render event
  renderInit(bookshelf);

  // Init form
  formInit(bookshelf);

  // Init search
  searchInit(bookshelf);
});