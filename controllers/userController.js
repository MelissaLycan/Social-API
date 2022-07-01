const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .populate({ path: "friends" })
      .select("-__v")
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .populate("friends")
      .populate("thoughts")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser({ req, body }, res) {
    User.create(body)
      .then(({ users }) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // delete
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({
          message: "User and associated thoughts deleted",
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an Friend to a user
  addFriend: async ({ params }, res) => {
    try {
      const friends = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      );
      res.json(friends);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Remove friend from a user
  removeFriend: async (req, res) => {
    try {
      const deleteFriend = await User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json({ message: "No user found with that ID :(" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = userController;
