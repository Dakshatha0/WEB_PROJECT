const User = require('../models/User');

const signUpController = async(req, res) => {
    try {
        const {user,password} = req.body;
        if(!email || !password){
            res.status(400).send('All fields are required');
        }

        const oldUser = await User.findOne({email});
        if(oldUser) {
            return res.status(409).send('User is already registered');
        }
    } 
    catch (error) {
        
    }
}

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
