import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import {app, server} from "./lib/socket.js";


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running on Render");
});

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});