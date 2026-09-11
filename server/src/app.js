import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public")); // to store data in static folder
app.use(cookieParser()); // to perform browser cookie data

import authRoute from "./routes/Auth/user_auth.route.js";
import addressRoute from "./routes/Address/address.routes.js"

app.use("/api/auth", authRoute)
app.use("/api/addresses", addressRoute)


export default app

