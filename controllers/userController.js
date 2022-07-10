const { User, Thought } = require('../models');

module.exports = {

  async getUsers(req, res) {
    try {

      const users = await User.find()
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
          select: '-__v' 
        });

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



  // getUsers(req, res) {
  //   User.find()
  //     .then((users) => res.json(users))
  //     .catch((err) => res.status(500).json(err));
  // },
  // getSingleUser(req, res) {
  //   User.findOne({ _id: req.params.userId })
  //     .select('-__v')
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: 'No user with that ID' })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // create a new user
  // createUser(req, res) {
  //   User.create(req.body)
  //     .then((dbUserData) => res.json(dbUserData))
  //     .catch((err) => res.status(500).json(err));
  // },
};