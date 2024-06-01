import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, unique: true,required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  genere: { type: String, required: true },
});

const bookModel = model("books", bookSchema);

export default bookModel;


//user want to give the review
  //-> review:{
      // rating:min-1 max-10,
      // desc,


  //}
