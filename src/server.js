import express from "express";
import { config } from "dotenv";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import auth from "./middlewares/auth.js";
import bookModel from "./models/bookMode.js";
import bookRouter from "./routes/todoRoute.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';


config();

const app = express();
const port = process.env.PORT || 9090;
const db_uri = process.env.DB_URI || null;

app.use(express.json());

app.use(cookieParser());

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'yourSecretKey', // Use an environment variable for the secret in production
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.DB_URI || 'mongodb://localhost:27017/todo-app' }),
//   cookie: {
//     secure: process.env.NODE_ENV === 'production', // true in production
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//   },
// }));



app.get("/", (req, res) => {
  res.send("this is a home route");
});

app.use("/users", userRouter);

app.use("/books", bookRouter);

app.listen(port, async () => {
  try {
    await connectToDB(db_uri);
    console.log("we are successfully connected to database");
    console.log(`server is running at port ${port} `);
  } catch (err) {
    console.log(err);
  }
});

//auth -> where we are checking that used should be valid
//authorization -> here we are going to  check if you has the permission or not ,
