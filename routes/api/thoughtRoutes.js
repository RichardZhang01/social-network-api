const thoughts = require('express').Router();
const {

} = require('../../controllers/thoughtController');


thoughts.route("/")
    .get()
    .post();

thoughts.route("/:thoughtId")
    .get()
    .put()
    .delete();

thoughts.route("/:thoughtId/reactions/")
    .post();

thoughts.route("/:thoughtId/reactions/:reactionId")
    .delete();

module.exports = thoughts;