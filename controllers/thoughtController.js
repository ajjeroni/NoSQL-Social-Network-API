const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      if (newThought) {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._id } },
          { new: true }
        );
      }
      res.json('thought created')
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.userId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};
