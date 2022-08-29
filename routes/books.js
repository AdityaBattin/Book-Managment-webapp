const express = require("express");
const router = express.Router();

//destructuring an JSON object .... JSON DATA IMPORT
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { route } = require("./users");

/**
 * Route : /books/find/:id
 * Methord used GET
 * Discrition : Get a book by ID
 * Access : Public
 * Parameters : ID
 */

router.get("/find/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      massage: "Book not Found in DataBase",
    });
  }

  return res.status(200).json({
    success: true,
    massage: "book Found fetching ....",
    data: book,
  });
});

/**
 * Route : /books
 * Methord used GET
 * Discrition : Getting all books
 * Access : Public
 * Parameters : NONE
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    massage: "Getting Books data....",
    data: books,
  });
});

/**
 * Route : /books/issued
 * Methord used GET
 * Discrition : to Get all issued books
 * Access : Public
 * Parameters : NONE
 */

router.get("/issued", (req, res) => {
  const userwithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  userwithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      massage: "No Books are issued Yet..",
    });

  return res.status(200).json({
    success: true,
    massage: "Fetching issued Books ....",
    data: issuedBooks,
  });
});

/**
 * Route : /books
 * Methord used POST
 * Discrition : Create new Book
 * Access : Public
 * Parameters : Author, Name ,Genre, Prise, id.
 */

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No data provided :( ",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      massage: "Book already exits with this ID please use a unique ID",
    });
  }

  const allBooks = [...books, data]; // books contains all the books imported and ,data added the data of the book in the body to it
  return res.status(404).json({
    success: true,
    massage: "Successfuly added an element",
    Newdata: data,
    TotalData: allBooks,
  });

  //Missing Fields Check can also be done
});

/**
 * Route : /books/id
 * Methord used PUT
 * Discrition : Update Existing Book
 * Access : Public
 * Parameters : Author, Name ,Genre, Prise, Publisher, id.
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      massage: "Book does not exist with that id",
    });
  }

  //we found the book so updating
  const updateData = books.map((each, index) => {
    if (each.id === id) {
      return { ...each, ...data }; //In each data update data from the body
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    newdata: data,
    atID: id,
    data: updateData,
  });
});

/**
 * Route : /books/id
 * Methord used PUT
 * Discrition : Update Existing Book
 * Access : Public
 * Parameters : Author, Name ,Genre, Prise, Publisher, id.
 */

router.get("/issued/withfine", (req, res) => {});

router.get("*", (req, res) => {
  res.status(400).json({
    success: false,
    massage: "This routes does not exist",
  });
});

//default export
module.exports = router;
