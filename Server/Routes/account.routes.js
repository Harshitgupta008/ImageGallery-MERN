import express from "express";
import { RegisterUser, LoginUser, UserAuthentication, UserMessageSend, GetAllmessage, ImageUpload, Getimages, DeleteMessage } from "../Controller/account.controller.js"
import upload from "../Controller/imagehandling.controller.js";
import authentication from "../Middleware/authentication.js";

const router = express.Router();

router.route("/api/register").post(RegisterUser);
router.route("/api/login").post(LoginUser);
router.route("/api/UserAuth").get(authentication, UserAuthentication);
router.route("/api/MessageSend").post( UserMessageSend );
router.route("/api/getallMessage").get(authentication, GetAllmessage );


router.use(express.urlencoded({ extended: false }))
router.route('/api/imageUpload').post(authentication, upload.single('image'), ImageUpload);
router.route("/api/Getimages").get(authentication, Getimages );


router.route("/api/checkmessage/:id").delete(authentication, DeleteMessage );



export default router;
