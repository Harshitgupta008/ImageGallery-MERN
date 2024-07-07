import User from "../Modles/account.modles.js";
import bcrypt from "bcrypt";

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
                "name":checkUser.name
            })
        } else {
            return res.status(400).send(" Check your email or passowrd ")
        }
    } catch (error) {
        console.log(`error in login page :: ${error}`)
    }
}

const Getuser = (req, res) => {
    return res.send("yes done get part ")
}


export { Getuser, RegisterUser, LoginUser };