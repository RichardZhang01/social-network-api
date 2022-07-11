const users = require('express').Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

users.route('/')
    .get(getUsers)
    .post(createUser);

users.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

users.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = users;