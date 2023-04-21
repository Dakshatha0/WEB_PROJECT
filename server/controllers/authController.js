const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/responseWrapper');

const signUpController = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send(error(400, 'All fields are required'));
        }

        const oldUser = await User.findOne({ email });
        if(oldUser) {
            return res.status(409).send(error(409,'User is already registered'));
        } 
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashPassword,
        });
        return res.status(201).send(success(201, {
            user,
        }));
    } 
    catch (error) {
        console.log(error);
    }
};

const logInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send(error(400, 'All fields are required'));
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).send(error(404,'User not registered'));
        } 
        const matched = await bcrypt.compare(password, user.password);
        if(!matched) {
            return res.status(403).send(error(403,'Incorrect password'));
        }
        const accessToken = generateAccessToken({_id:user._id,});
        const refreshToken = generateRefreshToken({_id:user._id,});
        
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return res.status(200).send(success(200, {accessToken}));
    } 
    catch (error) {
        console.log(error);
    }
};
//this api will check the refresh token validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt) {
        return res.status(401).send(error(401,'Refresh token in cookie is required'));
    }
    const refreshToken = cookies.jwt 

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        
        const _id = decoded._id;
        const accessToken = generateAccessToken({_id});
        
        return res.status(201).send(success(201, { accessToken }));
    }
    
    catch (e) {
        console.log(error);
        return res.send(error(401,'Invalid refresh token'));
    }
}

//internal functions
const generateAccessToken = (data) => {
    try{
        const token =  jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y',
        });
        console.log(token);
        return token;
        }
    catch(error){
        console.log(error);
    }
}
const generateRefreshToken = (data) => {
    try{
        const token =  jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '15m',
        });
        console.log(token);
        return token;
        }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    signUpController,
    logInController,
    refreshAccessTokenController
}
