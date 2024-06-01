import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  rating: { type: String, required: true },
  desc: { type: String, required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "books" },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

const reviewModel = model("reviews", reviewSchema);

export default reviewModel;

// we also going to add the reviews for the book
