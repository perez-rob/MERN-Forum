const { AuthenticationError } = require('apollo-server-express');
const { User, Topic, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("You need to be logged in!");
          },

        getTopicByName: async (parent, args) => {
            const postData = await Topic.findOne({ name: args.name }).populate({
                path: 'posts',
                model: 'Post',
                populate: [
                    {
                        path: 'author',
                        model: 'User'
                    },
                    {
                        path: 'comments',
                        model: 'Comment',
                        populate: {
                            path: 'author',
                            model: 'User'
                        },
                    }
                ]
            });
            return postData;
        },
        getTopics: async () => {
            return await Topic.find({});
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            if (!user) {
                throw new AuthenticationError('user not created');
            }
            const token = signToken(user);

            if (!token) {
                throw new AuthenticationError('token not signed');
            }

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user exists');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            console.log("=================")
            console.log(token)
            console.log("=================")
            return { token, user };
        },
        createComment: async(parent, {content, author, upvotes, postId}, context) => {
            const newComment = await Comment.create({
                content: content,
                author: mongoose.Types.ObjectId(author),
                upvotes: upvotes
            });
            await Post.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(postId) },
                { $push: { comments: newComment } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(author) },
                { $push: { comments: newComment } },
                { new: true }
            );
            return newComment;
        },
        removeComment: async (parent, { commentId, postId }, context) => {
            if (context.user) {

                const updatedPost = await Post.findByIdAndUpdate(
                    mongoose.Types.ObjectId(postId),
                    { $pull: { comments: mongoose.Types.ObjectId(commentId) } },
                    { new: true }
                  );

                  await User.findByIdAndUpdate(
                    mongoose.Types.ObjectId(context.user._id),
                    { $pull: { comments: mongoose.Types.ObjectId(commentId) } },
                    { new: true }
                  );
                  await Comment.deleteOne({_id: mongoose.Types.ObjectId(commentId) })

                return updatedPost;
              }
        
              throw new AuthenticationError('You need to be logged in!');
            },
        createPost: async (parent, {question, content, author, topic}, context) => {


            const newPost = await Post.create({question, content, topic: mongoose.Types.ObjectId(topic), author: mongoose.Types.ObjectId(author)});
            await Topic.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(topic) },
                { $push: { posts: newPost } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(author) },
                { $push: { posts: newPost } },
                { new: true }
            );
            return newPost;
        },
        removePost: async (parent, { postId, topicId }, context) => {
            if (context.user) {
                const commentList = await Post.findById(
                    mongoose.Types.ObjectId(postId),
                     "comments"
                  );

                const updatedTopic = await Topic.findByIdAndUpdate(
                  mongoose.Types.ObjectId(topicId),
                  { $pull: { posts: mongoose.Types.ObjectId(postId) } },
                  { new: true }
                );


                await User.findByIdAndUpdate(
                    mongoose.Types.ObjectId(context.user._id),
                    { $pull: { posts: mongoose.Types.ObjectId(postId) } },
                    { new: true }
                  );
                  if (commentList.comments.length){
                    commentList.comments.forEach(async (comment) => {
                       await User.findOneAndUpdate(
                            {comments: mongoose.Types.ObjectId(comment) },
                            { $pull: { comments: mongoose.Types.ObjectId(comment) } },
                            { new: true }
                          );

                          await Comment.deleteOne({_id: comment});
                    })
                  }
                  
                  await Post.deleteOne({_id: mongoose.Types.ObjectId(postId) })

                return updatedTopic;
              }
        
              throw new AuthenticationError('You need to be logged in!');
            },

    },
    
};

module.exports = resolvers;
