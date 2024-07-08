import express from "express";
import { RegisterUser, LoginUser, UserAuthentication, UserMessageSend, GetAllmessage } from "../Controller/account.controller.js"
import authentication from "../Middleware/authentication.js";

const router = express.Router();

router.route("/api/register").post(RegisterUser);
router.route("/api/login").post(LoginUser);
router.route("/api/UserAuth").get(authentication, UserAuthentication);
router.route("/api/MessageSend").post( UserMessageSend );
router.route("/api/getallMessage").get(authentication, GetAllmessage );





export default router;
