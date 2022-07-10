const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: [
            true,
            'Please enter a thought'
        ],
        minLength: 1,
        maxLength: [
          280,
          'Thought must be less than or equal to 280 characters.'
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => moment(date).format('MMM Do, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: [
          true,
          'There must be a username associated with this thought.'
      ]
    },
    reactions: [ reactionSchema ]
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;   
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;