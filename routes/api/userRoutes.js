const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactionss
router.route("/:thoughtId/reactionss").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/assignments/:reactionId").delete(removeReaction);

module.exports = router;
