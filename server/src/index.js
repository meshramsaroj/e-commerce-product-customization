
import app from "./app.js";
import connectDB from "./config/db_connection.js";

const PORT = process.env.PORT || 7002

connectDB().then(res=>{
    app.listen(PORT, ()=>{
        console.log("App is running on port: ", PORT)
    })
}).catch(error=>{
    console.log("Error while running app: ", error)
})



