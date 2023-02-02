const { Schema, model, Types } = require('mongoose');
const moment = require('moment')

//create Reaction schema

const reactionSchema = new Schema (
  {
     reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
     },
     reactionBody: {
      type: String,
      required: true,
      maxlength: 280
     },
     username: {
      type: String,
      required: true,
     },
     createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtDay => moment(createdAtDay).format('MM DD, YYYY'),
     },
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false,
  }
)

// create Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: createdAtDay => moment(createdAtDay).format('MM DD, YYYY')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


thoughtSchema.virtual('reactionCount').get( function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
