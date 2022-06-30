const router = require("express").Router();
const { Thought } = require("../../models/");

Thought,
  ({
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
  } = require("../../controllers/thoughtController.js"));

// /api/thought
router.route("/").get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
