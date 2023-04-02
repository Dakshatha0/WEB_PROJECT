const User = require('../models/User');
const bcrypt = require('bcrypt');
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

const logInController = async(req, res) => {
    try {
        res.send('from login');
    } catch (error) {
        
    }
}
module.exports = {
    signUpController,
    logInController
}
