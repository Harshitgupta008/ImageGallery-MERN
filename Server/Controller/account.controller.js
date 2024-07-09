import User from "../Modles/account.modles.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

const RegisterUser = async (req, res) => {
    const { name, email, number, place, password, cpassword } = req.body;

    if (!name || !email || !number || !place || !password || !cpassword) {
        return res.status(400).send("all field are mendaterry");
    }
    try {
        const NewUser = new User({

            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            place: req.body.place,
            password: req.body.password,
            cpassword: req.body.cpassword,

        })

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).send("User alerady exist")
        } else {
            if (password === cpassword) {
                await NewUser.save();
                return res.status(200).send(" Register successfully ");
            } else {
                return res.status(401).send(" password mismatch ")
            }
        }
    } catch (error) {
        console.log(`error in register page :: ${error}`)
    }
}



const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("all field are mendaterry");
    }
    try {
        const checkUser = await User.findOne({ email });
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (email && checkPassword) {
            const payload = {
                _id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                number: checkUser.number,
                place: checkUser.place
            }
            const token = await checkUser.GenrateToken(payload);
            return res.status(200).json({
                "message": "loginsuccessfully",
                "token": token,
            })
        } else {
            return res.status(400).send(" Check your email or passowrd ")
        }
    } catch (error) {
        console.log(`error in login page :: ${error}`)
    }
}



const UserMessageSend = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send("all field are mendaterry")
    }
    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            await findUser.CollectMessages(name, message);
            return res.status(200).send(" Message was send successfully");
        } else {
            return res.status(400).send(" User not found ");
        }
    } catch (error) {
        console.log(`error in getuser page :: ${error}`)

    }
}




const UserAuthentication = async (req, res) => {
    try {
        const userData = await req.user;
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error in getuser page :: ${error}`)

    }
}

const GetAllmessage = async (req, res) => {
    try {
        const userData = await req.user;
        if (userData) {
            const allmessage = await userData.messages;
            const msg = allmessage.map((ele) => ({ "message": ele.message, "name": ele.name, "date": ele.date }))
            return res.status(200).json({ msg });
        } else {
            return res.status(400).send("message not found")
        }
    } catch (error) {
        console.log(`error in getuser message page :: ${error}`)

    }
}


//create image ruote and use cloudinary for use storage 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECREATE
});
const ImageUpload = async (req, res) => {
    const {email} = req.body;
    const {images} = req.file;
    if (!email || images) {
        return res.status(400).send("all field are mendaterry")
    }
    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path).catch((error) => { console.log(error) });
            console.log("cloud " + uploadResult.secure_url);

            // delete our image form 'uploads/' folder after upload cloudinary
            fs.unlink(req.file.path, function (err) {
                if (err) console.log("error in delete fs" + err);
                else {
                    console.log("delete file")
                }
            })
            await findUser.CollectImages(uploadResult.secure_url);
            return res.status(200).send(" image  send successfully");
        } else {
            return res.status(400).send(" User not found ");
        }
    } catch (error) {
        console.log(`error in imagesend in controller page :: ${error}`)

    }

}

const Getimages = async (req, res) => {
    try {
        const userData = await req.user;
        if (userData) {
            const allimages = await userData.images;
            const msg = allimages.map((ele) => ({ "message": ele.image, "date": ele.date }))
            return res.status(200).json({ msg });
        } else {
            return res.status(400).send("message not found")
        }
    } catch (error) {
        console.log(`error in getuser message page :: ${error}`)

    }
}

export { RegisterUser, LoginUser, UserAuthentication, UserMessageSend, GetAllmessage, ImageUpload, Getimages};