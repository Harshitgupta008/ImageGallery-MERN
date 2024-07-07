import express from "express";
import { Getuser, RegisterUser, LoginUser } from "../Controller/account.controller.js"


const router = express.Router();

router.route("/api/register").post(RegisterUser);
router.route("/api/login").post(LoginUser);





router.route("/").get(Getuser);

export default router;
