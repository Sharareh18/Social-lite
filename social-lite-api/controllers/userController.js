const { User, Thought } = require('./models'); 

module.exports = {    
//get all users  
async getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.populate('thoughts friends');
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
    const user = await User.findByIdAndUpdate({ _id: params.id }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
},

// delete a user 
async deleteUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
},

// add a friend
async addFriend(req, res) {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { $push: { friends: friendId } }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
},
// remove a friend
async removeFriend(req, res) {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
};
module.exports = userController;