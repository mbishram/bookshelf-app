import Bookshelf from "db/bookshelf.js";
import bookInit from "pages/index/book.js";

/**
 * Render event name
 * @type {string}
 */
export const RENDER_BOOKS_EVENT_NAME = "RENDER_EVENT";

/**
 * Initialize event
 * @param {Bookshelf} bookshelf
 */
const init = (bookshelf) => {
  const emptyHTMLString = "<p>Tidak ada buku :(</p>";

  addEventListener(RENDER_BOOKS_EVENT_NAME, (event) => {
    /**
     * @type {Book[]}
     */
    const books = event.detail || bookshelf.data;

    const incompleteBookListEl = document.querySelector("#incompleteBookList");
    const completeBookListEl = document.querySelector("#completeBookList");

    // Empty previous render
    incompleteBookListEl.innerText = "";
    completeBookListEl.innerText = "";

    let isIncompleteBookExist = false;
    let isCompleteBookExist = false;

    books.forEach((book) => {
      const bookEl = book.generateElement();

      if (!book.isComplete) {
        incompleteBookListEl.appendChild(bookEl);
        isIncompleteBookExist = true;
      } else {
        completeBookListEl.appendChild(bookEl);
        isCompleteBookExist = true;
      }
    });

    // Render an empty message if either incomplete or complete list empty.
    if (!isIncompleteBookExist) incompleteBookListEl.innerHTML = emptyHTMLString;
    if (!isCompleteBookExist) completeBookListEl.innerHTML = emptyHTMLString;

    // Init book
    bookInit(bookshelf);
  });

  // First render after event listener added
  Bookshelf.render();
};

export default init;