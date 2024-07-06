import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/DBconnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./routes/messageRouter.js"


const app =express();
dotenv.config({path:"./config/config.env"});



app.use(cors({
    origin:[process.env.PORTFOLIO_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true, // used to get files from frontend
    tempFileDir:"/tmp/"
}))



// all routes
app.use("/api/v1/messsage",messageRouter);


// database connection
dbConnection();

// middleware that handle all errors
app.use(errorMiddleware);

export default app;