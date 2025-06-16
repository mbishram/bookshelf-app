import Book from "models/book.js";

const book1 = new Book({year: 2020, author: "Test", title: "Test2"});
const book2 = new Book({year: 2021, author: "Testr", title: "Test3"});
book1.update({year: 2000, author: "Lorempi"});
book1.isComplete = true;
console.log("Hello, world!", book1, book2);
