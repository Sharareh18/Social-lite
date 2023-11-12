const { User, Thought } = require('../models'); 

module.exports = {    
//get all users  
async getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
},

// get a user by id 
async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//  create a user  
async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

// update a user
async updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: params.id }, 
      { $set: req.body },
      { new: true }
    );

    if (!user) {
    res.status(400).json({ message: 'No user with this id!'});
  }
  res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
},

// delete a user 
async deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and associated thoughts deleted!' })
  } catch (err) {
    res.status(500).json(err);
  }
},

// add a friend
async addFriend(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} }, 
      { new: true }
      )
      if(!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
},
// remove a friend
async removeFriend(req, res) { 
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId }, 
      { $pull: { friends: params.friendId } }, 
      { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
};


