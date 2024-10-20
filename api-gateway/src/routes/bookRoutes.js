const express = require("express");
const bookService = require("../services/bookService");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  bookService.ViewAllBooks({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.json(response.books);
  });
});

router.get("/:id", (req, res) => {
  bookService.ViewBook({ id: req.params.id }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.json(response.book);
  });
});

router.post("/", authMiddleware, (req, res) => {
  bookService.AddBook(req.body, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.status(201).json(response.book);
  });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const bookRequest = { id: req.params.id };
  try {
    const existingBookResponse = await new Promise((resolve, reject) => {
      bookService.ViewBook(bookRequest, (error, response) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });

    if (!existingBookResponse || !existingBookResponse.book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const existingBook = existingBookResponse.book;

    console.log("req.body : ", req.body)

    const updateData = {
      id: req.params.id,
      title: req.body.title || existingBook.title,
      author: req.body.author || existingBook.author,
      description: req.body.description || existingBook.description,
      publishedYear: req.body.publishedYear || existingBook.publishedYear,
    };

    bookService.EditBook(updateData, (error, response) => {
      if (error) {
        console.log("Error in edit book route:", error);
        return res.status(500).json({ error: error.details });
      }
      res.json(response.book);
    });
  } catch (error) {
    console.error("Error in edit book route:", error);
    return res.status(500).json({ error: "Error fetching book" });
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  bookService.DeleteBook({ id: req.params.id }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.json({ message: "Book deleted successfully" });
  });
});

module.exports = router;
