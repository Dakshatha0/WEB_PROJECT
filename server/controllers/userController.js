const { json } = require('express');
const User = require("../models/User");
const {success, error} = require('../utils/responseWrapper');
const Post = require('../models/Post');

const followOrUnfollowUserController = async(req, res) => {
    try {
        const  {userIdtoFollow} = req.body;
    const curUserId = req._id;

    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);

    if(curUserId == userIdtoFollow) {
        return res.send(error(409,'User cannot follow themselves'));
    }
    if(!userToFollow) {
        return res.send(error(404, 'User to follow not found'));
    }
    if(curUser.followings.includes(userIdtoFollow)) {
        //already followed
        const followingIndex = curUser.followings.indexOf(userIdtoFollow);
        curUser.followings.splice(followingIndex, 1);

        const followerIndex = userToFollow.followers.indexOf(curUser);
        userToFollow.followers.splice(followerIndex, 1);
    }
    else {
        userToFollow.followers.push(curUserId);
        curUser.followings.push(userIdtoFollow);
    }
    await userToFollow.save();
        await curUser.save();

        return res.send(success(200, {user: userToFollow}));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const getPostsOfFollowing = async (req, res) => {
    try {
        const curUserid = req._id;
        const curuser = await User.findById(curUserId);
        const posts = await Post.find({
        'owner' : {
            '$in': curUser.followings
        }
    }) 

    return res.send(success(200, posts));
    } catch (error) {
        console.log(e);
        return res.send(error(500, e.message));
    }
}
    module.exports = {
        followOrUnfollowUserController,
        getPostsOfFollowing
    }
