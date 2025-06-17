import {updateFormHeader} from "pages/index/form.js";
import {populateForm} from "utils/form.js";

/**
 * Initialize book
 * @param {Bookshelf} bookshelf
 */
const init = (bookshelf) => {
  const bookEls = document.querySelectorAll(".book");
  bookEls.forEach(bookEl => {
    const id = bookEl.getAttribute("data-bookid");
    const book = bookshelf.get(id);

    // Add event to complete button
    const isCompleteButton = bookEl.querySelector(
      ":scope button[data-testid=\"bookItemIsCompleteButton\"]");
    isCompleteButton.addEventListener("click", () => {
      book.isComplete = !book.isComplete;
    });

    // Add event to remove button
    const deleteButton = bookEl.querySelector(
      ":scope button[data-testid=\"bookItemDeleteButton\"]");
    deleteButton.addEventListener("click", () => {
      bookshelf.delete(id);
    });

    // Add event to edit button
    const editButton = bookEl.querySelector(
      ":scope button[data-testid=\"bookItemEditButton\"]");
    editButton.addEventListener("click", () => {
      const formEl = document.querySelector("section#form");

      // Scroll to form
      formEl.scrollIntoView({behavior: "smooth"});

      // Update form header
      updateFormHeader("Edit Buku");

      // Populate form
      populateForm(formEl, book.toObject());
    });
  });

};

export default init;
