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

    const values = serializeForm(this);

    const isEdit = !!values.id;

    if (!isEdit) {
      const book = new Book(values);
      bookshelf.add(book);
    } else {
      bookshelf.update(values);
    }

    event.target.reset();
    alert(`Buku berhasil di${!isEdit ? "tambah" : "edit"}!`);

    updateFormHeader("Tambah Buku");
  });
};

export default init;
