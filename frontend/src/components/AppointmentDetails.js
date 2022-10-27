import { useAppointmentsContext } from '../hooks/useAppointmentsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const AppointmentDetails = ({ appointment }) => {
  const { dispatch } = useAppointmentsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/appointments/' + appointment._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_APPOINTMENT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{appointment.date}</h4>
      <p><strong>Doctor : </strong>{appointment.doctor}</p>
      <p>{formatDistanceToNow(new Date(appointment.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default AppointmentDetails