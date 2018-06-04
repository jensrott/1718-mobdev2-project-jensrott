const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  group: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  kind: {
    type: String,
    required: true
  },
  bikes: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  groupride: [ // Could be another model
    {
      /*
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      */
      name: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },

      from_time: {
        type: String,
        required: true
      },
      to_time: {
        type: String,
      },

      start_date: {
        type: String,
        //required: true,
      },
      
      current: {
        type: Boolean,
        default: false
      },
      from_route: {
        type: String,
        required: true
      },
      to_route: {
        type: String,
      },
      description: {
        type: String
      },
      /* To add */
      /* people that are present */
      present: {
        type: String
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
    }
  ],
  friends: [ // Could be another model
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      },
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
