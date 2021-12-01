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

        // const users = await User.insertMany(userSeeds);

        
        const createUsers = async () => {        
            userSeeds.forEach(async (element) => {
            await User.create({
                username: element.username,
                email: element.email,
                password: element.password})
        });
            await User.create({
                username: 'Washington',
                email: 'pamela@testmail.com',
                password: 'password12345'});

                let storedUserIds = await User.find({},'_id')
            
            return storedUserIds
    };


        const userIdList = await createUsers();
        console.log("=================")

        const comments = await Comment.insertMany(commentSeeds);
   
        const topics = await Topic.insertMany(topicSeeds);

        const posts = await Post.insertMany(postSeeds);

     console.log("Uid list")
        console.log(userIdList)

        for(eachComm of comments){
            const randomUser = userIdList[Math.floor(Math.random() * userIdList.length)];
            eachComm.author = randomUser;
            await eachComm.save();
        }

        console.log("Topic list")
        console.log(topics)

        for(eachTop of topics){
            if(eachTop.name == "HTML") {
                eachTop.posts = [posts[0]._id];
                await eachTop.save();
            } else if(eachTop.name == "HTCSSML") {
                eachTop.posts =  [posts[1]._id, posts[2]._id, posts[3]._id];
                await eachTop.save();
            }
        }
        const setupPosts = async () => {
            posts[0].author = userIdList[1];
            posts[0].topic = topics[0]._id;
            posts[0].comments = [
                comments[1]._id,
                comments[2]._id
            ];
            await posts[0].save();

            posts[1].author = userIdList[3];
            posts[1].topic = topics[1]._id;
            posts[1].comments = [
                comments[4]._id,
                comments[5]._id,
                comments[6]._id
            ]; 
            await posts[1].save();

            posts[2].author = userIdList[2];
            posts[2].topic = topics[1]._id;
            posts[2].comments = [
                comments[0]._id
            ];
            await posts[2].save();

            posts[3].author = userIdList[0];
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
