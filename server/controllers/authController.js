const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signUpController = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send('All fields are required');
        }

        const oldUser = await User.findOne({ email });
        if(oldUser) {
            return res.status(409).send('User is already registered');
        } 
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashPassword,
        });
        return res.status(201).json({
            user,
        });
    } 
    catch (error) {
        console.log(error);
    }
};

const logInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send("All fields are required");
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).send("User not registered");
        } 
        const matched = await bcrypt.compare(password, user.password);
        if(!matched) {
            return res.status(403).send("Incorrect password");
        }
        const accessToken = generateAccessToken({_id:user._id, email: user.email});
        return res.json({accessToken});
    } 
    catch (error) {
        
    }
};

//internal functions
const generateAccessToken = (data) => {
    try{
        const token =  jwt.sign(data, 'asfhjdfhvdjvdfgdfftydyt', {
            expiresIn: '1'
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
}
