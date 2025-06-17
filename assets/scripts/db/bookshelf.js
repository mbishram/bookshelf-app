import {RenderBooksEvent} from "libs/render.js";
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
   * Return incomplete books
   * @returns {Book[]}
   */
  get incomplete() {
    return this.#data.filter((book) => !book.isComplete);
  }

  /**
   * Return complete books
   * @returns {Book[]}
   */
  get complete() {
    return this.#data.filter((book) => book.isComplete);
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
   * Call render book event
   */
  static render() {
    dispatchEvent(RenderBooksEvent);
  }
}