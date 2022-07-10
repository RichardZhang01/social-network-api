const users = require('express').Router();
const {
    getUsers
} = require('../../controllers/userController');

users.route('/')
    .get(getUsers)
    .post();

users.route('/:userId')
    .get()
    .put()
    .delete();

users.route('/:userId/friends/:friendId')
    .post()
    .delete();

module.exports = users;