import mongoose from "mongoose";

const connection = async (username, password) => {
    // console.log(username, password);
    const URL = `mongodb://localhost:27017/userr`
        //`mongodb+srv://${username}:${password}@cluster0.o1byfzn.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Error while connectiing to the database");
    }
}
export default connection;