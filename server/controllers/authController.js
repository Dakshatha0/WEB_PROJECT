const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/responseWrapper');

const signUpController = async (req, res) => {
    try {
        const {name, email,password} = req.body;
        if(!email || !password || !name){
            return res.send(error(400, 'All fields are required'));
        }

        const oldUser = await User.findOne({ email });
        if(oldUser) {
            return res.send(error(409,'User is already registered'));
        } 
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        const newUser = await User.findById(user._id);

        return res.send(success(201, 'User created successfuly'));
    } 
    catch (e) {
        return res.send(error(500, e.message));
    }
};

const logInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.send(error(400, 'All fields are required'));
        }

        const user = await User.findOne({ email }).select('+password');
        if(!user) {
            return res.send(error(404,'User not registered'));
        } 
        const matched = await bcrypt.compare(password, user.password);
        if(!matched) {
            return res.send(error(403,'Incorrect password'));
        }
        const accessToken = generateAccessToken({_id:user._id,});
        const refreshToken = generateRefreshToken({_id:user._id,});
        
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        });

        return res.send(success(200, {accessToken}));
    } 
    catch (e) {
        return res.send(error(500, e.message));
    }
};
//this api will check the refresh token validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt) {
        return res.send(error(401,'Refresh token in cookie is required'));
    }
    const refreshToken = cookies.jwt 

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        
        const _id = decoded._id;
        const accessToken = generateAccessToken({_id});
        
        return res.send(success(201, { accessToken }));
    }
    
    catch (e) {
        console.log(e);
        return res.send(error(401,'Invalid refresh token'));
    }
}

const logOutController = async (req, res) => {
    //deleting cookies
    try {
        res.clearCookie('jwt', {
            httpOnly: true, 
            secure: true,
        })
        return res.send(success(200, 'User logged out'));
    } catch (e) {
        return res.send(error(500, e.message));
    }
}
//internal functions
const generateRefreshToken = (data) => {
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
const generateAccessToken = (data) => {
    try{
        const token =  jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '1d',
        });
        console.log(token);
        return token;
        }
    catch(error){
        console.log(error);
    }
};
module.exports = {
    signUpController,
    logInController,
    refreshAccessTokenController,
    logOutController
}
