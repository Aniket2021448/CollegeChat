import express from "express"; // ES6 syntax
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import {app} from "./socket/socket.js";
import cookieParser from "cookie-parser";
import {server} from './socket/socket.js';


const PORT = process.env.PORT || 5000;    // Either port value under the .env or 5000

dotenv.config();

app.use(cookieParser()); // middleware to access the cookie used in protectRoute.js
app.use(express.json()); // middleware to parse JSON data  

app.use("/api/auth", authRoutes);       // authentication routes server -> auth.routes ->
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
    // root route http://localhost:5000/
//     res.send("Hello world, Server is running.... shit!");
// });


server.listen(5000, ()=> {connectToMongoDB();
    console.log(`Server started on port ${PORT}`);
});
