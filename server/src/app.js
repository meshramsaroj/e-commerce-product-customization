import express from "express";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";

dotenv.config()

const app = express()

app.use(express.json({ limit: "16kb" })); // to read json data upto 16kb limit
app.use(express.urlencoded({ limit: "16kb", extended: true })); // to read data from browser url
app.use(express.static("public")); // to store data in static folder
app.use(cookieParser()); // to perform browser cookie data

import authRoute from "./routes/Auth/user_auth.route.js";
import addressRoute from "./routes/Address/address.routes.js"
import categoryRoute from "./routes/Product/category.routes.js"

app.use("/api/auth", authRoute)
app.use("/api/addresses", addressRoute)
app.use("/api/categories", categoryRoute)



export default app

