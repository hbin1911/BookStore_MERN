const express = require('express');
const Book = require("../models/bookModel");
const router = express.Router();


// Route for creating book
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        res.status(400).send({ message: "All fields are mandatory" });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      res.status(201).send(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  // Route for getting all the books
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      res.status(201).json({
        count: books.length,
        data: books,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  // Route for getting one book with id
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      res.status(201).json(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  //Route for updating a book
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        res.status(400).send({ message: "All fields are mandatory" });
      }
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        res.status(404).json({ message: "Book not found" });
      }
      res.status(200).send({ message: "Book updated" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  //Route for deleting a book with id
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).send({ message: "Book deleted successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

  module.exports = router;
  