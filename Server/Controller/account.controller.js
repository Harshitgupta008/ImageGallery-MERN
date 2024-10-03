import User from "../Modles/account.modles.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import fs from 'fs'

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
        if (checkUser) {
            const checkPassword = await bcrypt.compare(password, checkUser.password);
            if (checkPassword) {

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

                return res.status(400).send("check detail ")
            }
        } else {
            return res.status(400).send("user not found ")
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

const UpdateUser = async (req, res) => {
    try {
        const { name, email, place, number } = req.body;
        if (!name || !email || !place || !number) {
            return res.send("all field are mendetory");
        }
        await User.findOneAndUpdate({ email },{ name, place, number }, { new: true })
        return res.status(200).send("update data");
    } catch (error) {
        console.log(`error in UpdateUser page :: ${error}`)

    }
}

const GetAllmessage = async (req, res) => {
    try {
        const userData = await req.user;
        if (userData) {
            const allmessage = await userData.messages;
            const msg = allmessage.map((ele) => ({ "message": ele.message, "name": ele.name, "date": ele.date, "id": ele._id }))
            return res.status(200).json({ msg });
        } else {
            return res.status(400).send("message not found")
        }
    } catch (error) {
        console.log(`error in getuser message page :: ${error}`)

    }
}


// user message deleted by his choise
const DeleteMessage = async (req, res) => {
    try {
        const userData = await req.user;
        const messageId = req.params.id;

        if (!userData) {
            return res.status(400).json({ error: "User not found" });
        }

        userData.messages = userData.messages.filter(message => message._id.toString() !== messageId);

        await userData.save();
        return res.status(200).send("data deleted");

    } catch (error) {

        console.log(`error in  random deletemessage:: ${error}`)
    }
}

//create image ruote and use cloudinary for use storage 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECREATE
});
const ImageUpload = async (req, res) => {
    try {
        const userData = await req.user;
        if (userData) {

            const uploadResult = await cloudinary.uploader.upload(req.file.path).catch((error) => { console.log(error) });
            console.log("cloud " + uploadResult.secure_url);

            // delete our image form 'uploads/' folder after upload cloudinary
            fs.unlink(req.file.path, function (err) {
                if (err) console.log("error in delete fs" + err);
                else {
                    console.log("delete file")
                }
            })
            await userData.CollectImages(uploadResult.secure_url);
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
            const msg = allimages.map((ele) => ({ "image": ele.image, "date": ele.date, "id": ele._id }))
            return res.status(200).json({ msg });
        } else {
            return res.status(400).send("message not found")
        }
    } catch (error) {
        console.log(`error in getuser message page :: ${error}`)

    }
}


const DeleteImages = async (req, res) => {
    try {
        const userData = req.user;
        const imageId = req.params.id;
        const { imageURL } = req.body;

        if (!userData) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!imageURL) {
            return res.status(400).json({ error: "Image URL not provided" });
        }

        const imageName = imageURL.split('/').pop().split('.')[0];

        const result = await cloudinary.uploader.destroy(imageName);

        if (result.result !== 'ok') {
            console.error("Error in Cloudinary delete: ", result);
            return res.status(400).json({ error: "Failed to delete image from Cloudinary" });
        }

        userData.images = userData.images.filter(image => image._id.toString() !== imageId);

        await userData.save();
        return res.status(200).send("Image deleted successfully");

    } catch (error) {
        console.error(`Error in deleteImage controller: ${error}`);
        return res.status(400).json({ error: "An error occurred while deleting the image" });
    }
};



export { RegisterUser, LoginUser, UserAuthentication, UpdateUser, UserMessageSend, GetAllmessage, ImageUpload, Getimages, DeleteMessage, DeleteImages };