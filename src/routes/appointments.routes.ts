// agendamentos
import {Router} from 'express'
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'
import { startOfHour , parseISO , isEqual} from 'date-fns'
const appointmentsRouter = Router()

const RepositoryAppointments = new AppointmentRepository()

appointmentsRouter.post('/', (request , response) => {
    const {provider , date} = request.body

    const parseDate = startOfHour(parseISO(date))

    const findAppointmentInSameDate = RepositoryAppointments.findByDate(parseDate)

    if(findAppointmentInSameDate){
        return response.status(400).json({message: "This date is already booked."})
    }

    const appointment = RepositoryAppointments.create({
        provider ,
        date: parseDate})

    return response.json(appointment)
})

appointmentsRouter.get('/' , (request , response ) => {
    const appointment = RepositoryAppointments.index()
    return response.json(appointment)
})

export default appointmentsRouter
