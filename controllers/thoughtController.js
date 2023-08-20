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
          { runValidators: true, new: true }
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
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // async createReaction(req, res) {
  //   try {
  //     const newReaction = await reactions.create(req.body);
  //     console.log('json recieved')
  //     if (newReaction) {
  //       await Thought.findOneAndUpdate(
  //         { _id: req.body.thoughtId },
  //         { $push: { reactions: newReaction._id } },
  //         { runValidators: true, new: true }
  //       );
  //     }
  //     res.json('reaction created')
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $pull: {reactions: {reactionId: req.params.reactionId} }},
      { new: true })
    .then((reaction) => res.json(reaction))
    .catch((err) => res.status(500).json(err));
  }
};
