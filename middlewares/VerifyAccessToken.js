import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "No access token provided" 
    });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found" 
    });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
        success: false, 
        message: error.message 
    });
  }
};
