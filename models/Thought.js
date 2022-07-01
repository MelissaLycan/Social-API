const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/date");

const reactionSchema = new Schema([
  // {
  //   name: String,
  //   thought: Schema.Types.ObjectId,
  //   ref: "thoughts",
  // },
  {
    reactionId: {
      // Mongoose's ObjectId data type
      type: Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      maxlength: 280,
    },
    // thoughtId: { type: Schema.Types.ObjectId, ref: "thoughts" },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (timestamp) => moment().format(timestamp),
    },
  },
  {
    toJSON: {
      getters: Boolean,
      virtuals: Boolean,
    },
    id: false,
  },
]);
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thoughts", thoughtSchema);

module.exports = Thought;
