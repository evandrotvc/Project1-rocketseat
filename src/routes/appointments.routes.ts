// agendamentos
import {Router} from 'express'
import AppointmentRepository from '../repositories/AppointmentRepository'
import {  parseISO } from 'date-fns'
import CreateAppointmentsService from '../services/CreateAppointmentsServices'

const appointmentsRouter = Router()

const RepositoryAppointments = new AppointmentRepository()

appointmentsRouter.get('/' , (request , response ) => {
    const appointment = RepositoryAppointments.index()
    return response.json(appointment)
})

appointmentsRouter.post('/', (request , response) => {
    try {
        const {provider , date} = request.body
    const parseAppoitment = parseISO(date)

    const ServiceCreateAppointments = new CreateAppointmentsService(RepositoryAppointments)

    const appointment= ServiceCreateAppointments.execute({provider, date: parseAppoitment})

    return response.json(appointment)
    } catch(err){
        return response.status(400).json({error : err.message})
    }
})



export default appointmentsRouter
