const { User, Thought} = require('../models'); 

module.exports = {
//get all users  

getUsers(req, res) {
  User.find({})
  .then(user => res.json(user))
  .catch(err => {
    res.status(500).json(err);
  });
},

// get a user by id 
getUserById(req, res) {
  User.findOne({ _id: req.params.userId })
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then(user => {
      if (!user) {
        return res.status(404).json({message: 'No user with this ID'});
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
},

//  create a user  

createUser(req, res) {
   User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
},


// update a user
updateUserById(req,res){
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
  .then(user => {
    if (!user) {
      return res.status(404).json({message: 'No user with this ID'});
    }
    res.json(user);
  })
  .catch(err => res.status(500).json(err));
},

// updateUserById(req, res) {
//   User.findOneAndUpdate(req.params.id, req.body, {new: true})
//   .then(user => {
//     if (!user) {
//       return res.status(404).json({message: 'No user with this ID'});
//     }
//     res.json(user);
//   })
//   .catch(err => res.status(500).json(err));
// },

  

// async updateUser(req, res) {
//   try {
//     const user = await User.findOneAndUpdate(
//       { _id: params.userId }, 
//       { $set: req.body },
//       { runValidators: true, new: true }
//     );

//     if (!user) {
//     res.status(400).json({ message: 'No user with this id!'});
//   }
//   res.json(user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// },

// delete a user 

deleteUserById(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'No user with that id' });
      }
      return Thought.deleteMany({ _id: { $in: User.thoughts } });
    })
    .then(() => {
      res.json({ message: 'User and associated thoughts deleted!' });
    })
    .catch(err => res.status(500).json(err));
},


// add a friend
addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.body.friendId } },
    { runValidators: true, new: true }
  )
  .then(user => {
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  })
  .catch(err => res.status(500).json(err));
},


// delete a friend
deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
  .then(user => {
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  })
  .catch(err => res.status(500).json(err));
}
};


