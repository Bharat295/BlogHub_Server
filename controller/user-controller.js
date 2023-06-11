import User from "../model/user.js";

export const signupUser = async (request, respose) => {
        
    try {
        const user = request.body;
        const newUser = new User(user);
        console.log(newUser);
        await newUser.save();

        return respose.status(200).json({ msg: 'signup successfull' });
    } catch (error) {
        console.log("error is happeing here")
        console.log(error);
        return respose.status(500).json({ msg: 'Error while signup the user' });
        
    }
}