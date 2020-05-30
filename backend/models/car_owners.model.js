const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const car_ownersSchema = new Schema({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {type: String, required: true },
  country: {type: String, required: true },
  car_model: {type: String, required: true },
  car_model_year: {type: Number, required: true },
  car_color: {type: String, required: true },
  gender: {type: String, required: true },
  job_title: {type: String, required: true },
  bio: {type: String, required: true },
}, {
  timestamps: true,
});

const CarOwner = mongoose.model('CarOwner', car_ownersSchema);

module.exports = CarOwner;