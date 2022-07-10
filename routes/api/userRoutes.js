const users = require('express').Router();
const {

} = require('../../controllers/userController');

users.route('/')
    .get()
    .post();

users.route('/:userId')
    .get()
    .put()
    .delete();

users.route('/:userId/friends/:friendId')
    .post()
    .delete();

module.exports = users;