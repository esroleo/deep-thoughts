const { User, Thought } = require('../models');
// graphSQL error handling definition
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
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
          
            return user;
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
          
            return user;
          }
    }
  };
  
module.exports = resolvers;