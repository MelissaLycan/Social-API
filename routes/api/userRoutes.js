const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createThought,
  deleteThought,
  addAssignment,
  removeAssignment,
} = require("../../controllers/thoughtController");

// /api/Thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

// /api/Thoughts/:ThoughtId/assignments
router.route("/:thoughtId/reactionss").post(addAssignment);

// /api/Thoughts/:ThoughtId/assignments/:assignmentId
router.route("/:thoughtId/assignments/:reactionId").delete(removeAssignment);

module.exports = router;
