const Appointment = require('../models/appointmentModel')
const mongoose = require('mongoose')

// get all Appointments
const getAppointments = async (req, res) => {
  const user_id = req.user._id

  const appointments = await Appointment.find({user_id}).sort({createdAt: -1})

  res.status(200).json(appointments)
}

// get a single Appointment
const getAppointment= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Appointment'})
  }

  const appointment = await Appointment.findById(id)

  if (!appointment) {
    return res.status(404).json({error: 'No such Appointment'})
  }
  
  res.status(200).json(appointment)
}


// create new Appointment
const createAppointment = async (req, res) => {
  const {date, doctor} = req.body

  let emptyFields = []

  if(!date) {
    emptyFields.push('date')
  }
  if(!doctor) {
    emptyFields.push('doctor')
  } 
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const appointment = await Appointment.create({date, doctor, user_id})
    res.status(200).json(appointment)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a Appointment
const deleteAppointment= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Appointment'})
  }

  const appointment = await Appointment.findOneAndDelete({_id: id})

  if (!appointment) {
    return res.status(400).json({error: 'No such appointment'})
  }

  res.status(200).json(appointment)
}

// update a appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such appointment'})
  }

  const appointment = await Appointment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!appointment) {
    return res.status(400).json({error: 'No such appointment'})
  }

  res.status(200).json(appointment)
}


module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment
}