const mongoose = require('mongoose');

const FULL_VOLUME = 1000;
const MAX_DESCRIPTION = 10000;

const KegSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false
  },
  volume: {
    type: Number,
    default: FULL_VOLUME
  }
}, { timestamps: true });


// Validators
KegSchema.path('description').validate(v => v.length <= MAX_DESCRIPTION, '{VALUE} is too long.');

module.exports = mongoose.model('Keg', KegSchema);
