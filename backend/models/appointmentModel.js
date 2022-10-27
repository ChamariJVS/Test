const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  doctor: {
    type: String,
    required: true
  }, 
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)