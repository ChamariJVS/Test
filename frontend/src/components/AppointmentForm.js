import { useState } from "react"
import { useAppointmentsContext } from "../hooks/useAppointmentsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const AppointmentForm = () => {
  const { dispatch } = useAppointmentsContext()
  const { user } = useAuthContext()

  const [date, setDate] = useState('')
  const [doctor, setDoctor] = useState('') 
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const appointment = {date, doctor}

    const response = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setDate('')
      setDoctor('') 
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_APPOINTMENT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Appointment</h3>

      <label>Appointment Date:</label>
      <input 
        type="Date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label>Doctor :</label>
      <input 
        type="text"
        onChange={(e) => setDoctor(e.target.value)}
        value={doctor}
        className={emptyFields.includes('doctor') ? 'error' : ''}
      />
 

      <button>Add Appointment</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AppointmentForm