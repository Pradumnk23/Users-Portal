import User from "../models/model.js";
import { createHash } from "node:crypto";

export const getUser = async (req, res) => {
  try {
    const exp = req.body;

    const oldemail = await User.find({ email: exp.email });
    let newmap = new Map(Object.entries(oldemail[0]._doc));
    console.log(newmap);

    // console.log(oldemail);
    const isEmail = newmap.get("email");
    const ispassword = newmap.get("password");
    var hasswd = createHash("md5").update(exp.password).digest("hex");
    console.log(ispassword);
    console.log(hasswd);
    if (isEmail == exp.email && ispassword == hasswd) {
      res.status(201).json({ message: "Login Successful" });
    } else {
      res.status(401).json({ message: "User Not Found!" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const exp = req.body;

    const oldemail = await User.find();

    res.status(201).json(oldemail);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const editUserDetails = async (req, res) => {
  const exp = req.body;

  const oldemail = await User.find({ email: exp.email });
  let newmap = new Map(Object.entries(oldemail[0]._doc));
  console.log(newmap);

  const uid = newmap.get("_id");

  try {
    const newDetails = await User.findByIdAndUpdate(uid, req.body, {
      new: true,
    });
    res.status(201).json(newDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  const exp = req.body;

  const oldemail = await User.find({ email: exp.email });

  let isEmailExist = false;
  if (oldemail.length == 0) {
    // console.log("is empty");
    isEmailExist = false;
  } else {
    let newmap = new Map(Object.entries(oldemail[0]._doc));
    console.log(newmap);
    // console.log(oldemail);
    const isEmail = newmap.get("email");

    if (isEmail == exp.email) {
      isEmailExist = true;
    } 

    // console.log(isEmailExist);
    // console.log(isEmail);
  }
  const ispasswd = exp.password;
  var hasswd = createHash("md5").update(ispasswd).digest("hex");
  console.log(hasswd);
  const newExp = new User({
    name: exp.name,
    phone: exp.phone,
    dob: exp.dob,
    email: exp.email,
    password: hasswd,
  });

  try {
    if (isEmailExist) {
      res.status(401).json({ message: "email already exist" });
    } else {
      const response = await newExp.save();
      res.status(201).json(response);
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

