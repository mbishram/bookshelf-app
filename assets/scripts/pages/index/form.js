import Book from "models/book.js";
import {serializeForm} from "utils/form.js";

/**
 * Update form section header
 * @param {string} text
 */
export const updateFormHeader = (text) => {
  const formHeaderEl = document.querySelector("section#form > h2");
  formHeaderEl.textContent = text;
};

/**
 * Initialize form
 * @param {Bookshelf} bookshelf
 */
const init = (bookshelf) => {
  const formEl = document.querySelector("#bookForm");

  formEl.addEventListener("submit", function(event) {
    // Prevent reload
    event.preventDefault();

    const book = new Book(serializeForm(this));
    bookshelf.add(book);

    event.target.reset();
    alert("Buku disimpan");

    updateFormHeader("Tambah Buku");
  });
};

export default init;
