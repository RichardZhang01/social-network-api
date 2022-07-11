const { User, Thought } = require('../models');

module.exports = {

  async getUsers(req, res) {

    try {
      const users = await User.find()
        .select('-__v')

      if (!users.length) {
        return res.status(404).json({
          message: 'No users found'
        });
      };

      return res.status(200).json({
        message: 'Users successfully retrieved',
        data: users
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }

  },

  async getUser(req, res) {

    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate({
          path: 'thoughts',
          select: '-__v',
          populate: {
            path: 'reactions',
            select: '-__v'
          }
        })
        .populate({
          path: 'friends',
          select: [
            '-__v',
          ],
        });

      if (!user) {
        return res.status(404).json({
          message: 'No user found with that ID'
        });
      };

      return res.status(200).json({
        message: 'User successfully retrieved',
        data: user
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }

  },

  async createUser(req, res) {

    try {
      const createdUser = await User.create(req.body);

      if (!createdUser) {
        return res.status(404).json({
          message: 'Could not create user'
        });
      };

      return res.status(200).json({
        message: 'User successfully created',
        data: createdUser
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }

  },

  async updateUser(req, res) {

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: 'Could not update user'
        });
      };

      return res.status(200).json({
        message: 'User successfully updated',
        data: updatedUser
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }

  },

  async deleteUser(req, res) {

    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({
          message: 'Could not delete user'
        });
      };

      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

      return res.status(200).json({
        message: 'User successfully deleted',
        data: deletedUser
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }

  },

  async addFriend(req, res) {

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: 'Could not add friend to user'
        });
      };

      return res.status(200).json({
        message: 'Friend successfully added',
        data: updatedUser
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }

  },

  async deleteFriend(req, res) {

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: 'Could not remove friend from user'
        });
      };

      return res.status(200).json({
        message: 'Friend successfully removed',
        data: updatedUser
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }

  }

};