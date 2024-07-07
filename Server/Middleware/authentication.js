import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import User from "../Modles/account.modles.js";

dotenv.config();

const authentication = async (req, res, next)=>{
    const token = req.header("Authorization");
    try {
        if(!token){
            return res.status(400).send("user not autherized")
        }else{
            const jwttoken = token.replace("Bearer ","").trim();

            const isVerified = await jwt.verify(jwttoken,process.env.SECREATE_KEY);
            const userData = await User.findOne({email:isVerified.email}).select({password:0,cpassword:0})

            req.user = userData;
            req.token = token;
            req.userID = userData._id;
            next();
        }
    } catch (error) {
        console.log(`error in verify token authontication part :: ${error}`)
    }

}
export default authentication;