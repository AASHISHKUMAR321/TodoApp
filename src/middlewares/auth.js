import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklist.js";

const auth = async (req, res, next) => {
  console.log(req.session)
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "token is not provide please provide the token" });
  }
  const token = req.headers["authorization"].split(" ")[1];

  //here we have to check if token  is blacklist or not

  const blacklist = await blacklistModel.findOne({ token: token });

  if (blacklist) {
    return res
      .status(401)
      .json({ message: "this token is blacklist try to get the new token" });
  }

  if (token) {
    jwt.verify(token, "masai", (err, result) => {
      if (err) console.log(err);
      if (result) {
        req.user = result;
        next();
      } else {
        res.status(400).send("this  is not a valid token");
      }
    });
  }
  // how we are going to check this if user is valid or not
};

export default auth;

//register
//login
// auth middleware
//logout

//-> if some got your token
//-> correct or not
// token should have expire time is imp
// -> concept of refresh token and access token

// refresh token ->  30 min ->
// access token -> 5min -> every 5 min token is going to change

//logout
// you got the idea
// logout

// there is goint to be one end point
// /logout
//-> we need to something with the token
//-> token blacklisting
//-> we will store the token into blacklist collection
// while your verifying  the token that time we have check if
//is blacklist or not.
