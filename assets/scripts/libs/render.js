import Bookshelf from "db/bookshelf.js";

/**
 * Render event name
 * @type {string}
 */
export const RENDER_BOOKS_EVENT_NAME = "RENDER_EVENT";

/**
 * Render event
 * @type {Event}
 */
export const RenderBooksEvent = new Event(RENDER_BOOKS_EVENT_NAME);

/**
 * Initialize event
 * @param {Bookshelf} bookshelf
 */
const init = (bookshelf) => {
  const emptyEl = document.createElement("p");
  emptyEl.innerText = "Tidak ada buku :(";

  addEventListener(RENDER_BOOKS_EVENT_NAME, () => {
    const incompleteBookListEl = document.querySelector("#incompleteBookList");
    const completeBookListEl = document.querySelector("#completeBookList");

    // Empty previous render
    incompleteBookListEl.innerText = "";
    completeBookListEl.innerText = "";

    // Render incomplete section
    const incompleteBook = bookshelf.incomplete;
    if (incompleteBook.length) {
      incompleteBook.forEach((book) => {
        incompleteBookListEl.appendChild(book.generateElement());
      });
    } else {
      incompleteBookListEl.appendChild(emptyEl);
    }

    // Render complete section
    const completeBook = bookshelf.complete;
    if (completeBook.length) {
      completeBook.forEach((book) => {
        completeBookListEl.appendChild(book.generateElement());
      });
    } else {
      completeBookListEl.appendChild(emptyEl);
    }
  });

  // First render after event listener added
  Bookshelf.render();
};

export default init;