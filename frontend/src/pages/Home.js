import { useEffect }from 'react'
import { useAppointmentsContext } from "../hooks/useAppointmentsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import AppointmentDetails from '../components/AppointmentDetails'
import AppointmentForm from '../components/AppointmentForm'

const Home = () => {
  const {appointment, dispatch} = useAppointmentsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_APPOINTMENTS', payload: json})
      }
    }

    if (user) {
      fetchAppointments()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {appointment && appointment.map((appointment) => (
          <AppointmentDetails key={appointment._id} appointment={appointment} />
        ))}
      </div>
      <AppointmentForm />
      <div>
        <img src='assets/undraw_authentication_re_svpt.svg'></img>
      </div>
    </div>
  )
}

export default Home