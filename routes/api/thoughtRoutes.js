const thoughts = require('express').Router();
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


thoughts.route("/")
    .get(getThoughts)
    .post(createThought);

thoughts.route("/:thoughtId")
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

thoughts.route("/:thoughtId/reactions/")
    .post(addReaction);

thoughts.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = thoughts;