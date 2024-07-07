import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

const UserShema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    place: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    },
    messages: [
        {
            name: {
                type: String,
                require: true
            },
            message: {
                type: String,
                require: true
            }
        }
    ],
    imageDp: {
        data: Buffer,
        type: String
    },
    images: [
        {
            image: {
                data: Buffer,
                type: String
            },
        }
    ]
}, { timestamps: true });

UserShema.pre('save', async function (next) {
    try {
        const round = 10;
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, round);
            this.cpassword = await bcrypt.hash(this.cpassword, round);
        }
        next();
    } catch (error) {
       
    }
})


// genrate token 
dotenv.config();
const SecreateKey  = process.env.SECREATE_KEY;
UserShema.methods.GenrateToken = async function(payload){
    try {
        const token = await jwt.sign(payload,SecreateKey)
        return token;
    } catch (error) {
        console.log(`error in schema Genratetoken part :: ${error}`)
    }
}

// message add  
UserShema.methods.CollectMessages = async function(name,message){
    try {
        this.messages = await this.messages.concat({name,message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(`error in schema CollectMessages part :: ${error}`)
    }
}


// images add  
UserShema.methods.CollectImages = async function(image){
    try {
        this.images = await this.images.concat({image});
        await this.save();
        return this.images;
    } catch (error) {
        console.log(`error in schema CollectImages part :: ${error}`)
    }
}

const User = mongoose.model("ImageGallery", UserShema);

export default User;




