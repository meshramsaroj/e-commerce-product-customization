import mongoose from "mongoose"

const connectDB = async() => {
    try {

        const connectionInstance = await mongoose.connect(process.env.MONOGODB_URL)
        console.log("MongoDB connected successfully on Port: ", connectionInstance.connection.port)
        
    } catch (error) {
        console.log("Error while connecting mongodb database", error)
        process.exit(1)
    }
}

export default connectDB;