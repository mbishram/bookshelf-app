// Unnecessarily complex. I just want to make it as complete as I possibly can.

import {isNil} from "utils/lang.js";
import Bookshelf from "db/bookshelf.js";

/**
 * Book class model
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {number} year
 * @property {boolean} isComplete - Reading completion status
 */
export default class Book {
  /**
   * Private property of id
   * @type {string}
   * @private
   */
  #id;
  /**
   * Private property of title
   * @type {string}
   * @private
   */
  #title;
  /**
   * Private property of author
   * @type {string}
   * @private
   */
  #author;
  /**
   * Private property of year
   * @type {number}
   * @private
   */
  #year;
  /**
   * Private property of isComplete
   * @type {boolean}
   * @private
   */
  #isComplete;

  /**
   * Default book constructor
   * @param {string=} data.id
   * @param {string} data.title
   * @param {string} data.author
   * @param {number} data.year
   * @param {boolean=} data.isComplete
   */
  constructor(data) {
    this.#id = data.id || crypto.randomUUID();
    this.#title = data.title;
    this.#author = data.author;
    this.#year = data.year;
    this.#isComplete = data.isComplete || false;
  }

  // Setter and getter

  /**
   * id getter
   * @readonly
   * @returns {string}
   */
  get id() {
    return this.#id;
  }

  /**
   * title getter
   * @readonly
   * @returns {string}
   */
  get title() {
    return this.#title;
  }

  /**
   * author getter
   * @readonly
   * @returns {string}
   */
  get author() {
    return this.#author;
  }

  /**
   * year getter
   * @readonly
   * @returns {number}
   */
  get year() {
    return this.#year;
  }

  /**
   * isComplete getter
   * @returns {boolean}
   */
  get isComplete() {
    return this.#isComplete;
  }

  /**
   * isComplete setter
   * @param {boolean} value
   */
  set isComplete(value) {
    this.#isComplete = value;

    Bookshelf.render();
  }

  // Public method

  /**
   * Update book data
   * @param {string=} data.title
   * @param {string=} data.author
   * @param {number=} data.year
   * @param {boolean=} data.isComplete
   */
  update(data) {
    if (!isNil(data.title)) this.#title = data.title;
    if (!isNil(data.author)) this.#author = data.author;
    if (!isNil(data.year)) this.#year = data.year;
    if (!isNil(data.isComplete)) this.#isComplete = data.isComplete;

    Bookshelf.render();
  }

  /**
   * Return object version of Book
   * @return {Object.<string, any>}
   */
  toObject() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      year: this.year,
      isComplete: this.isComplete,
    };
  }

  /**
   * Generate HTML element of book
   * @returns {ChildNode}
   */
  generateElement() {
    const parser = new DOMParser();

    const htmlString =
      `<div data-bookid="${this.#id}" data-testid="bookItem" class="book">
  <h3 data-testid="bookItemTitle">${this.#title}</h3>
  <p data-testid="bookItemAuthor">Penulis: ${this.#author}</p>
  <p data-testid="bookItemYear">Tahun: ${this.#year}</p>
  <div class="button-list">
    <button data-testid="bookItemIsCompleteButton">
      ${!this.#isComplete ? "Selesai" : "Belum"} Dibaca
    </button>
    <button data-testid="bookItemDeleteButton">Hapus</button>
    <button data-testid="bookItemEditButton">Edit</button>
  </div>
</div>`;

    // Convert HTML string to element and return them
    return parser.parseFromString(htmlString,
      "text/html").body.firstChild;
  };
}