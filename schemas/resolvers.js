const { User, Thought } = require('../models');
// graphSQL error handling definition
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        // authentication method for middleware
        /* before adding the context user middleware auth function
        me: async (parent, args) => {
            const userData = await User.findOne({})
              .select('-__v -password')
              .populate('thoughts')
              .populate('friends');
        
            return userData;
            */
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('thoughts')
              .populate('friends');
        
            return userData;
          }
        
          throw new AuthenticationError('Not logged in');
        },
        // find all thoughts by username if any provided
        // if not username provided, give me all thoughts
        thoughts: async (parent, { username }) => {
            // ternary operator, if you find use pass the username as params
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // find thought by ID 
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            // Mongoose User model creates a new user in the database
            // with whatever is passed in as the args.
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // login resolver uses the authentication import
        // AuthenticationError
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
          },
          addThought: async (parent, args, context) => {
            if (context.user) {
              // token is context which includes
              // username, email and _id.
              const thought = await Thought.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { thoughts: thought._id } },
                { new: true }
              );
          
              return thought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          addReaction: async (parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { reactions: { reactionBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedThought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          }
    }
  };
  
module.exports = resolvers;