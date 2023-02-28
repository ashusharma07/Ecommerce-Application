import User from "../Models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc     Authunticate user & get token
// @desc     POST /api/user/login
// @desc     access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!!");
  }
});

// @desc     get user profile
// @desc     GET /api/users/profile
// @desc     private

const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const user = await User.findById(req.user._id);
  console.log("user", user);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile };
