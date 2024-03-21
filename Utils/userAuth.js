import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const userAuth = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Longin First",
      });
    }

    const decodeddata = jwt.verify(token, process.env.JWT_SECRATE);

    const user = await User.findById(decodeddata._id);
    req.user = user;
    next();
  }
};
