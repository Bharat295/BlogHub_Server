// import User from "../model/user.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
});
const user = new mongoose.model('user', userSchema);
import bcrypt from 'bcrypt';
import { request, response } from 'express';
import jwt from 'jsonwebtoken';

const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
        required: true
        }
    }
)

const Token = new mongoose.model('token', tokenSchema);


export const signupUser = async (request, respose) => {   
    try {
        
        const hashedPassword = await bcrypt.hash(request.body.Password , 10);
        const userFromFrontend = {name:request.body.name ,userName: request.body.userName , Password:hashedPassword};
        const newUser = new user(userFromFrontend);
        console.log(newUser);
        await newUser.save();
        return respose.status(200).json({ msg: 'signup successfull' });
    } catch (error) {
        console.log("error is happeing here")
        console.log(error);
        return respose.status(500).json({ msg: 'Error while signup the user' }); 
    }
}

export const loginUser = async (request, response) => {
    let userFromFrontend = await user.findOne({ userName: request.body.userName });
    console.log(userFromFrontend);
    console.log(request.body.userName);
    if (!userFromFrontend) {
        return response.status(400).json({ msg: 'Username does not match' });
    }
    try {
        let match = await bcrypt.compare(request.body.Password, userFromFrontend.Password);
        console.log(match);
        if (match) {
            const accesToken = jwt.sign(
                userFromFrontend.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken =
                jwt.sign(userFromFrontend.toJSON(), process.env.REFRESH_SECRET_KEY); 
            // console.log(accesToken);
            // console.log(refreshToken);

            const newToken = new Token({
                token: refreshToken
            });
            await newToken.save();

            return response.status(200).json({ accesToken: accesToken, refreshToken: refreshToken ,name : userFromFrontend.name , userName : userFromFrontend.userName });
       
        } else {
             return response.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while login' });
    }

}