const { Schema } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: [
            true,
            'Please enter a reaction'
        ],
        maxLength: [
          280,
          'Reaction must be less than or equal to 280 characters. Your reaction was {VALUE} characters long.'
        ]
    },
    username: {
        type: String,
        required: [
          true,
          'There must be a username associated with this reaction.'
      ]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => moment(date).format('MMM Do, YYYY [at] hh:mm a')
    }
  },

  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;