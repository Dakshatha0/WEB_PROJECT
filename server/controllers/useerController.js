const User = require("../models/User");

const followOrUnfollowUser = async(req, res) => {
    try {
        const  {userIdtoFollow} = req.body;
    const curUserId = req._id;

    const userToFollow = await User.findById(userToFollow);
    const curUser = await User.findById(curUserId);

    if(!userToFollow) {
        return res.send(error(404, 'User to follow not found'));
    }
    if(curUser.followings.includes(userIdtoFollow)) {
        //already followed
        const followingIndex = curUser.followings.indexOf(userIdtoFollow);
        curUser.followings.splice(followingIndex, 1);

        const followerIndex = userToFollow.followers.indexOf(curUser);
        userToFollow.followers.splice(followerIndex, 1);

        await userToFollow.save();
        await curUser.save();

        return res.send(success(200, 'User unfollowed'));
    }
    } catch (e) {
        return res.send(error(500, e.message));
    }
}