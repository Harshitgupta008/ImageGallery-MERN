import express from "express";
import dotenv from "dotenv";
import data from "./Db/userdatabase.js";
import router from "./Routes/account.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT||4000;

app.use(express.json());
data();


app.use(router);


app.listen(port,()=>{
    console.log(`server running port no :: ${port}`);
})