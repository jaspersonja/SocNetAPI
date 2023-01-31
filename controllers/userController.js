const { User, Thought } = require('../models');

module.exports = {

//GET all users
getUsers(req, res) {
  User.find({})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},
// GET single user
getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
  .populate('thoughts')
  .populate('friends')
  .select('-__v')
  .then((user) => 
    !user
    //if
      ? res.status(404).json({ message: 'No User Found!' })
      //else
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
    //----switched to ternary operators----
    // if(!user){res.status(404).json({ message: 'No User Found!' })}
    // else {res.json(user)}})
},
//CREATE a User
createUser(req, res) {
  User.create(req.body)
  .then((user) => res.json(user))
  .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
  });
},
//UPDATE a User
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true },
  )
  .then((user) => 
    !user
      //if
      ? res.status(404).json({ message: 'No User Found!' })
      //else
      : res.json(user)
      )
  .catch((err) => res.status(500).json(err));
},
//DELETE a User
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No User Found!' })
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
    .then(() => res.json({ message: 'User and their thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));
},

};
