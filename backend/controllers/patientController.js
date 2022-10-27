const Patient = require('../models/patientModel')
const mongoose = require('mongoose')

// get all Patients
const getPatients = async (req, res) => {
  const user_id = req.user._id

  const patients = await Patient.find({user_id}).sort({createdAt: -1})

  res.status(200).json(patients)
}

// get a single Patient
const getPatient= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Patient'})
  }

  const patient = await Patient.findById(id)

  if (!patient) {
    return res.status(404).json({error: 'No such Patient'})
  }
  
  res.status(200).json(patient)
}


// create new Patient
const createPatient = async (req, res) => {
  const {name, age,sickness} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!age) {
    emptyFields.push('age')
  } 
  if(!sickness) {
    emptyFields.push('sickness')
  } 
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const patient = await Patient.create({name, age,sickness, user_id})
    res.status(200).json(patient)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a Patient
const deletePatient= async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Patient'})
  }

  const patient = await Patient.findOneAndDelete({_id: id})

  if (!patient) {
    return res.status(400).json({error: 'No such patient'})
  }

  res.status(200).json(patient)
}

// update a patient
const updatePatient = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such patient'})
  }

  const patient = await Patient.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!patient) {
    return res.status(400).json({error: 'No such patient'})
  }

  res.status(200).json(patient)
}


module.exports = {
  getPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient
}