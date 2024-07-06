import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Db = process.env.MONGO_URL;

const data = async () => {
    try {
        await mongoose.connect(Db);
        console.log("mongo(data) part done")
    } catch (error) {
        console.log(`error in mongo part :: ${error}`)
    }
}
export default data;