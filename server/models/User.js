const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: { //to attach images
        publicId: String,
        url: String
    },
    followers: [ //array of Object IDs
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
});

module.exports = mongoose.model('user',userSchema);