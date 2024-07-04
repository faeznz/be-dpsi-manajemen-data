const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  dateIn: { type: Date, required: true },
  dateOut: { type: Date }
});

module.exports = mongoose.model('Item', itemSchema);
