import { Router } from "express";
import todoModel from "../models/bookMode.js";
import bookModel from "../models/bookMode.js";
import access_midddleware from "../middlewares/roles.js";
import reviewModel from "../models/reviewModel.js";

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
  console.log("get request");
  try {
    const books = await bookModel.find();
    res.json({ books: books });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

bookRouter.post(
  "/:id/review",
  access_midddleware(["librarian", "user"]),

  async (req, res) => {
    const { rating, desc } = req.body;

    try {
      const review = new reviewModel({
        rating,
        desc,
        userId: req.user.id,
        bookId: req.params.id,
      });
      await review.save();
      res.status(201).json({ message: "your  review is added successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);
bookRouter.get(
  "/:id/review",
  access_midddleware(["librarian", "user"]),

  async (req, res) => {
    const { rating, desc } = req.body;

    try {
      const review = await reviewModel.find().populate(["bookId", "userId"]);
      res.status(201).json({ review: review });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

bookRouter.post("/", access_midddleware(["librarian"]), async (req, res) => {
  const { title, author, price, genere } = req.body;

  try {
    const existBook = await bookModel.findOne({ title: title });
    if (existBook) {
      return res.status(400).json({
        message:
          "book is already present with this title try to give differnt title",
      });
    }
    const books = new bookModel({ title, author, price, genere });
    await books.save();
    res.json({ message: "book is created successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

bookRouter.patch(
  "/:id",
  access_midddleware(["librarian"]),
  async (req, res) => {
    try {
      const books = await bookModel.findByIdAndUpdate(req.params.id, req.body);

      res.json({ message: "book is updated  successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

bookRouter.delete(
  "/:id",
  access_midddleware(["librarian"]),
  async (req, res) => {
    try {
      const books = await bookModel.findByIdAndDelete(req.params.id);

      res.json({ message: "book is deleted  successfully" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

export default bookRouter;

// page-  2
// limit - 10

// 1  to 100
