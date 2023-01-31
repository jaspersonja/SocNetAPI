const { json } = require('express');
const { User, Thought } = require('../models');

module.exports = {
  //GET all thoughts
  getThoughts(req, res) {
    Thought.find({})
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },

  //GET single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought found!' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //CREATE and PUSH thought to user 
  createThought(req,res) {
    Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true },
      );
    })
    .then((thought) => 
      !thought
      ? res.status(404).json({ message: 'No user found!' })
      : res.status(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  //UPDATE thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true },
    )
    .then((user) => 
      !user
      ? res.status(404).json({ message: 'No thought found!' })
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

  //DELETE thought
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId }
    )
    .then((thought) => 
      !thought
      ? res.status(404).json({message: 'No thought found!'})
      : User.findOneAndUpdate(
        {thoughts: req.params.thoughtId},
        {$pull: {thoughts: req.params.thoughtId}},
        {new: true},
      )
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'Thought deleted, but no user found' })
      : res.json({ message: 'Thought successfully deleted' })
  )
  .catch((err) => res.status(500).json(err));
  },

  //CREATE reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought found!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  //DELETE reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

};