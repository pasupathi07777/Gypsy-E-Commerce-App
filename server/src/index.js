import express from "express";
import cors from "cors";
import dotenv from "dotenv";  
import connedtDb from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";   
import cartRoute from "./routes/cart.route.js";   
import { protectRoute } from "./middleware/auth.middleware.js";

dotenv.config({ path: "../.env" });


const app = express(); 

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({origin: true, credentials: true}));
app.use("/api/auth",authRoutes);
app.use("/api/cart",protectRoute, cartRoute);
// app.use("/api/profile", profileRoute);
// app.use("/api/stu-tec", teacherStudentRoute);


app.listen(5000,'0.0.0.0', () => {
  console.log("server is running on PORT:" + 5000);
  connedtDb();
});

