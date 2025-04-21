import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import candidateRouter from "./routes/candidateRoute.js";
import usersRouter from "./routes/userRoute.js";
import otpRouter from "./routes/otpRoute.js"
import path from "path"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

app.use("/api/candidates", candidateRouter )
app.use("/api/users", usersRouter)
app.use("/api/otp", otpRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"));
    })
}

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running on port http://localhost:${PORT}`);
});