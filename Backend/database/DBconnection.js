import mongoose from "mongoose";



const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MyPortfolio"
    }).then(()=>{
        console.log("connected to DB");
    }).catch((err)=>{
        console.log(`error occur while connecting to DB : ${err}`);
    })
}


export default dbConnection
