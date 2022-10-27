const express = require('express')
const {
  createPatient,
  getPatients,
  getPatient,
  deletePatient,
  updatePatient
} = require('../controllers/patientController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all Patient routes
router.use(requireAuth)

// GET all Patients
router.get('/', getPatients)

//GET a single Patient
router.get('/:id', getPatient)

// POST a new Patient
router.post('/', createPatient)

// DELETE a Patient
router.delete('/:id', deletePatient)

// UPDATE a Patient
router.patch('/:id', updatePatient)


module.exports = router