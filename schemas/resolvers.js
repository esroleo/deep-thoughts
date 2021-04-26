const { User, Thought } = require('../models');

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
    }
  };
  
module.exports = resolvers;