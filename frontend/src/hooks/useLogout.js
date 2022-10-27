import { useAuthContext } from './useAuthContext'
import { useAppointmentsContext } from './useAppointmentsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchAppointments } = useAppointmentsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchAppointments({ type: 'SET_APPOINTMENTS', payload: null })
  }

  return { logout }
}