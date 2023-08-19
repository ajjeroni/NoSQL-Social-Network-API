const { Schema, Types } = require('mongoose');
const formattedDate = require('../utils/formatDate.js');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectID,
      default: () => new Types.ObjectID(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formattedDate(date)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
