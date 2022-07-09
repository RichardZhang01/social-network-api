const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

// Schema to create User model
const userSchema = new Schema(
  {

    username: {
        type: String,
        unique: true,
        required: [
            true,
            'Please enter a username'
        ],
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: [ 
            true,
            'Please enter an email address'
        ],
        validate: [
            isEmail,
            'Please enter a valid email address'
        ]
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]

  },

  {

    toJSON: {
      virtuals: true,
    },

    id: false,

  }

);

userSchema
  .virtual('friendCount')
  .get(function () {

    return this.friends.length;
    
  });

const User = model('user', userSchema);

module.exports = User;