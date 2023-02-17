import express from "express";
import {
  getUser,
  getUserDetails,
  editUserDetails,
  createUser,
} from "../controller/controller.js";

const router = express.Router();

router.post("/login", (req, res) => getUser(req, res));
router.post("/register", (req, res) => createUser(req, res));
router.get("/user", (req, res) => getUserDetails(req, res));
router.post("/edit", (req, res) => editUserDetails(req, res));

export default router;


