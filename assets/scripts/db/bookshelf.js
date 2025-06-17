import {RENDER_BOOKS_EVENT_NAME} from "libs/render.js";
import Book from "models/book.js";

/**
 * Bookshelf db class
 * @property {Book[]} data
 */
export default class Bookshelf {
  /**
   * Storage cache
   * @type {Book[]}
   * @private
   */
  #data;
  #STORAGE_KEY;

  /**
   * Default constructor
   * @param {string=} storageKey - Custom local storage key name. Default, `BOOKSHELF_KEY`.
   */
  constructor(storageKey) {
    // Set storage key
    this.#STORAGE_KEY = storageKey || "BOOKSHELF_KEY";

    // Set data from local storage
    const data = this.getFromStorage();
    this.#data = data || [];

    // Create an event that will save to local storage if closed.
    addEventListener("beforeunload", () => this.saveToStorage());
  }

  // Getter and setter

  /**
   * data getter
   * @readonly
   * @returns {Book[]}
   */
  get data() {
    return this.#data;
  }

  /**
   * STORAGE_KEY static constant
   * @readonly
   * @returns {string}
   */
  get STORAGE_KEY() {
    return this.#STORAGE_KEY;
  }

  // Public method

  /**
   * Add a book
   * @param {Book} book
   */
  add(book) {
    this.#data.push(book);
    Bookshelf.render();
  }

  /**
   * Save books to local storage
   */
  saveToStorage() {
    const savedData = JSON.stringify(this.#data.map((book) => book.toObject()));
    localStorage.setItem(this.#STORAGE_KEY, savedData);
  }

  /**
   * Get books from local storage
   * @return {?Book[]}
   */
  getFromStorage() {
    const savedData = JSON.parse(localStorage.getItem(this.#STORAGE_KEY));

    if (!savedData) return null;

    return savedData.map((book) => new Book(book));
  }

  /**
   * Search books with `query` and render them
   * @param query
   */
  search(query) {
    // If empty query, render all
    if (!query) {
      Bookshelf.render();
      return;
    }

    const filteredData = this.#data.filter(
      (book) => book.title.toLowerCase().includes(query.toLowerCase()));

    // Show search summary
    const searchSummaryEl = document.querySelector("#searchSummary");
    searchSummaryEl.classList.remove("d-none");

    // Set search summary count
    const searchSummaryCountEl = document.querySelector(
      "#searchSummary p > span");
    searchSummaryCountEl.innerText = filteredData.length;

    // Call render event with filtered data
    const event = new CustomEvent(RENDER_BOOKS_EVENT_NAME,
      {detail: filteredData});
    dispatchEvent(event);
  }

  /**
   * Return book with `id`
   * @param {string} id
   * @return {Book}
   */
  get(id) {
    return this.#data.find((book) => book.id === id);
  }

  /**
   * Delete book with `id`
   * @param {string} id
   */
  delete(id) {
    const deleteIndex = this.#data.findIndex((book) => book.id === id);
    this.#data.splice(deleteIndex, 1);

    Bookshelf.render();
  }

  /**
   * Update book
   * @param {string} data.id
   * @param {string} data.title
   * @param {string} data.author
   * @param {number} data.year
   * @param {boolean} data.isComplete
   */
  update(data) {
    const {id, ...values} = data;
    this.get(data.id).update(values);
  }

  /**
   * Call render book event
   */
  static render() {
    // Hide search summary
    const searchSummaryEl = document.querySelector("#searchSummary");
    searchSummaryEl.classList.add("d-none");

    // Reset search summary count
    const searchSummaryCountEl = document.querySelector(
      "#searchSummary p > span");
    searchSummaryCountEl.innerText = "0";

    // Call render event
    const event = new Event(RENDER_BOOKS_EVENT_NAME);
    dispatchEvent(event);
  }
}