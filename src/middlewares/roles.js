import userModel from "../models/userModel.js";

const access_midddleware = (roles) => {
  return async (req, res, next) => {
    // console.log(req, roles)

    const currentUser = await userModel.findOne({ email: req.user.email });
    if (roles.includes(currentUser.role)) {
      next();
    } else {
     return  res
        .status(401)
        .json({ message: "you are not authorizated to access this route" });
    }
  
    //-> ["librarian"] -> current  user role
    //current user role
    // role - librarian
  };
};

export default access_midddleware;
// req,res,

// we are going to be use the req,
