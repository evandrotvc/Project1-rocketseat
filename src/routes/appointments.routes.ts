// agendamentos
import {Router} from 'express'
import Appointment from '../models/Appointment'
import { startOfHour , parseISO , isEqual} from 'date-fns'
const appointmentsRouter = Router()


const appointments: Appointment[] = []

appointmentsRouter.post('/', (request , response) => {
    const {provider , date} = request.body

    const parseDate = startOfHour(parseISO(date))

    const findAppointmentInSameDate = appointments.find(appointment => isEqual(appointment.date , parseDate))

    if(findAppointmentInSameDate){
        return response.status(400).json({message: "This date is already booked."})
    }
    const appointment = new Appointment(provider , parseDate)

    appointments.push(appointment)
    return response.json(appointment)
})

export default appointmentsRouter
