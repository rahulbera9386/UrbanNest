import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL,{
      
    });
    console.log("Database Connected Successfully");
  } catch (e) {
    console.log(`Error While Connecting To databse${e}`);
  }
};

export default dbConnection;
