import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7 

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: COOKIE_MAX_AGE,
}

export const signupController = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name) {
      return res.status(200).json({ 
        success: false,
        message: "Name is required" 
      });
    }

    if (!username) {
      return res.status(200).json({ 
        success: false,
        message: "Username is required" 
      });
    }

    if (!password) {
      return res.status(200).json({ 
        success: false,
        message: "Password is required" 
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({ 
        success: false,
        message: "Username already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
        name, 
        username, 
        password: 
        hashedPassword 
    });
    const savedUser = await newUser.save();
    
    const access_token = jwt.sign(
      { id: savedUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
  );

  res.cookie("access_token",access_token, COOKIE_OPTIONS)

  return res.status(200).json({ 
    success: true,
    message: "User created successfully" 
  });
  } catch (error) {
    return res.status(200).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(200).json({ 
        success: false,
        message: "Username is required" 
      });
    }

    if (!password) {
      return res.status(200).json({ 
        success: false,
        message: "Password is required" 
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(200).json({ 
        success: false,
        message: "Username not found" 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ 
        success: false,
        message: "Password incorrect" 
      });
    }

    const access_token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
    );

    res.cookie("access_token",access_token,COOKIE_OPTIONS)

    return res.status(200).json({ 
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(200).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
};



export const logoutController = async (req, res) => {
  try {
    res.clearCookie("access_token", COOKIE_OPTIONS)
    return res.status(200).json({
      success: true,
      message: "Logout successful"
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
}


export const verifyController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Token is valid",
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};