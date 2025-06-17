import {serializeForm} from "utils/form.js";
import Bookshelf from "db/bookshelf.js";

/**
 * Initialize search
 * @param {Bookshelf} bookshelf
 */
const init = (bookshelf) => {
  // Add event listener to search form
  const searchFormEl = document.querySelector("#searchBook");
  searchFormEl.addEventListener("submit", function(event) {
    // Prevent reload
    event.preventDefault();

    const data = serializeForm(this);
    bookshelf.search(data.query);
  });

  // Add event listener to reset search button
  const resetSearchButtonEl = document.querySelector("#resetSearch");
  resetSearchButtonEl.addEventListener("click", function() {
    Bookshelf.render();
  });
};

export default init;
