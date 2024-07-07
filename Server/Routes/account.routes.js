import express from "express";
import { RegisterUser, LoginUser, UserAuthentication } from "../Controller/account.controller.js"
import authentication from "../Middleware/authentication.js";

const router = express.Router();

router.route("/api/register").post(RegisterUser);
router.route("/api/login").post(LoginUser);
router.route("/api/UserAuth").get(authentication, UserAuthentication);





export default router;
