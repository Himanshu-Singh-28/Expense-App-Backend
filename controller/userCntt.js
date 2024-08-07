import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import { nodecache } from "../index.js";
import { sendcookie } from "../Utils/sendcookies.js";

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  if (nodecache.has("user")) {
    user = JSON.parse(nodecache.get("user"));
  } else {
    user = await User.findOne({ email: email });
    nodecache.set("user", JSON.stringify(user));
  }

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({
      success: false,
      message: "Invalid email or password",
    });
  }
  sendcookie(user, res, "Login successful", 200);
};

export const userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user && user.email == email) {
    return res.status(404).json({
      success: false,
      message: "Email already in use",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedpassword,
  });
  res.json({
    success: true,
    message: "Registered successfully",
  });
};

export const userLongout = (req, res) => {
  //   if (req.user.provider && req.user.provider == "google") {
  //     req.logout((err) => {
  //       if (err) console.log(err);
  //     });
  //     return res.status(200).json({
  //       success: true,
  //       message: " LogOut successfully",
  //     });
  //   } else {
  //     res
  //       .status(200)
  //       .cookie("token", "", {
  //         maxAge: 0,
  //         sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
  //         secure: process.env.NODE_ENV === "Development" ? false : true,
  //       })
  //       .json({
  //         success: true,
  //         message: "Long out Successfully",
  //       });
  //   }
    res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "Long out Successfully",
      });
      req.logout((err)=>console.log(err));
};

export const myProfil = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
