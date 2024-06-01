import { Router } from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklist.js";

const userRouter = Router();

// userRouter.get("/", async (req, res) => {
//   try {
//     const users = await userModel.find();
//     res.json({ users: users });
//   } catch (err) {
//     res.status(500).send(err.message);jsonwebtoken
//   }
// });

// userRouter.get("/:id", async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });
// userRouter.post("/register", async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// userRouter.patch("/:id", async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// userRouter.delete("/:id", async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

userRouter.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    //while you registring you have if user is already registerd or not .
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "email is already registerd try to login" });
    }

    bcrypt.hash(password, 10, async (err, result) => {
      if (err) console.log(err);
      const user = new userModel({ userName, email, password: result });
      await user.save();
      // 200 code for the success and 201 while add entires into the database

      return res.status(201).send("user is registerd successfully");
    });
  } catch (err) {
    atus(500).send(err.message);
    res.status(500).send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //step - 1 -> check is the users is present into the database or not
    const existUser = await userModel.findOne({ email: email });

    if (!existUser) {
      return res.status(400).json({
        message: "this email is not registerd try to register yourself first ",
      });
    }
    const hasedPassoword = existUser.password;
    bcrypt.compare(password, hasedPassoword, (err, result) => {
      if (err) console.log(err);
      if (result) {
        //if email or password both are correct in that what we have do
        // what we are goint to do is we send a token
        // we are goint to use jsonwebtoken
        // we have to generate a token

        const paylod = { email: existUser.email, id: existUser._id };
        //payload what we want to store inside the token
        // secret key
        jwt.sign(paylod, "masai", (err, token) => {
          if (err) console.log(err);
          req.session.userId = existUser._id; 
          res.status(200).json({ token: token });
        });
      } else {
        res.status(400).json({
          message: "check your password your password is not correct'",
        });
      }
    });
    // bcrypt.compare(password,)

    //at this line user is correct
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.get("/logout", async (req, res) => {
  if (!req.headers.authorization) {
    res
      .status(401)
      .json({ message: "token is not provide please provide the token" });
  }
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const blacklistToken = new blacklistModel({ token: token });
    await blacklistToken.save();
    res.status(201).json({ message: "your has loged-out successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// now here question is how it's going to work while we are going to login
// -> we have to match the email and the password

export default userRouter;

//let see you are buidling a ecommerce product

// amazon , flipkart

// products -> ele , home ap, clothes
//-> Home -> mom , father , brother ,

// we are goint to build a library system
// -> where can come and read the books
// -> library ->
// books ->{

//       title,
//       author,
//       price,
//       genere:

// }
// role ->  librarian , user,
//librarian - add read update ,delete
// user-> read the books
