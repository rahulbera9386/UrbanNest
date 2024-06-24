import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import dbConnection from "./database/dbConnection.js";
import bodyParser from "body-parser";
import router from "./routes/index.js"
import cookieParser from "cookie-parser";











const app=express();
dotenv.config();
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}));
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/",router)


dbConnection();

app.listen(process.env.PORT,()=>{
    console.log(`Server Is Listening on ${process.env.PORT}`);
})