import express from "express";
import { Getuser } from "../Controller/account.controller.js"

const router = express.Router();

router.route("/").get(Getuser);

export default router;