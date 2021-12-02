const db = require('../config/connection');
const { User, Topic, Post, Comment } = require('../models');
const userSeeds = require('./userSeeds.json');
const topicSeeds = require('./topicSeeds.json');
const postSeeds = require('./postSeeds.json');
const commentSeeds = require('./commentSeeds.json');


db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Topic.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});




        const users = await User.insertMany(userSeeds);

        const comments = await Comment.insertMany(commentSeeds);
   
        const topics = await Topic.insertMany(topicSeeds);

        const posts = await Post.insertMany(postSeeds);
        console.log("=================")
        



        const setupPosts = async () => {

            comments[0].author = users[0];
            await comments[0].save();

            comments[1].author = users[1];
            await comments[1].save();

            comments[2].author = users[2];
            await comments[2].save();

            comments[3].author = users[2];
            await comments[3].save();

            comments[4].author = users[2];
            await comments[4].save();

            comments[5].author = users[0];
            await comments[5].save();

            comments[6].author = users[1];
            await comments[6].save();

            posts[0].author = users[0];
            posts[0].topic = topics[0]._id;
            posts[0].comments = [
                comments[1]._id,
                comments[2]._id
            ];
            await posts[0].save();

            posts[1].author = users[3];
            posts[1].topic = topics[1]._id;
            posts[1].comments = [
                comments[4]._id,
                comments[5]._id,
                comments[6]._id
            ]; 
            await posts[1].save();

            posts[2].author = users[2];
            posts[2].topic = topics[1]._id;
            posts[2].comments = [
                comments[0]._id
            ];
            await posts[2].save();

            posts[3].author = users[1];
            posts[3].topic = topics[1]._id;
            posts[3].comments = [
                comments[3]._id
            ];
            await posts[3].save();

            topics[0].posts = [
                posts[0]._id
            ];
            await topics[0].save();

            topics[1].posts = [
                posts[1]._id,
                posts[2]._id,
                posts[3]._id
            ];
            await topics[1].save();

            users[0].comments = [comments[0]._id,
            comments[5]._id];
            users[0].posts = [posts[0]._id];
            await users[0].save();

            users[1].comments =  [comments[1]._id,
            comments[6]._id];
            users[1].posts = [posts[3]._id];
            await users[1].save();

            users[2].comments = [comments[2]._id,
            comments[3]._id, comments[4]._id ];
            users[2].posts = [posts[2]._id];
            await users[2].save();

            users[3].comments = [];
            users[3].posts = [posts[1]._id];
            await users[3].save();

            let dumbValue = await Topic.find({});
            return dumbValue;
        };
    

        let sayWhat = await setupPosts();
        console.log(sayWhat)
        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});
