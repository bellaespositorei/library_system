import mongoose from "mongoose";
import { authorSchema } from "./AuthorModel.js";

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    prize: { type: Number, required: true },
    pages: { type: Number },
    description: { type: String },
    author: authorSchema,
  },
  { versionKey: false },
);

const BookModel = mongoose.model("books", bookSchema);

export default BookModel;
