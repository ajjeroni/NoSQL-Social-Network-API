const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought.js')

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\w+@\w+(\.\w{2,3})+/, 'invalid email adress'],
    },
    thoughts: [
      {
      type: Schema.Types.ObjectID, 
      ref: "thought"
    },
  ],
    friends: [
      {
      type: Schema.Types.ObjectID, 
      ref: "user"
    },
  ],
  },
  {
    toJSON: {
      virtual: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length 
});

const User = model('user', userSchema);

module.exports = User;
