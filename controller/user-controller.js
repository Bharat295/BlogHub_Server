// import User from "../model/user.js";
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    userName: {
        type: String,
        // required: true,
        // unique: true
    },
    Password: {
        type: String,
        // required: true
    }
});
const user = new mongoose.model('user', userSchema);

export const signupUser = async (request, respose) => {
        
    try {
        const userFromFrontend = request.body;
        // console.log(userFromFrontend);
        const newUser = new user(userFromFrontend);
        // console.log(newUser);
        await newUser.save();
        return respose.status(200).json({ msg: 'signup successfull' });
    } catch (error) {
        console.log("error is happeing here")
        console.log(error);
        return respose.status(500).json({ msg: 'Error while signup the user' }); 
    }
}