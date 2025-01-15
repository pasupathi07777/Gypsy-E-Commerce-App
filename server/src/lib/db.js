import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const mongoURI = process.env.MONGO_DB_URI;
const connedtDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed", error);
  }
};

export default connedtDb;
