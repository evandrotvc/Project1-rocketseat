// agendamentos
import {Router} from 'express'
import {getCustomRepository} from 'typeorm'
import AppointmentRepository from '../repositories/AppointmentRepository'
import {  parseISO } from 'date-fns'
import CreateAppointmentsService from '../services/CreateAppointmentsServices'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated) // middleware verify authentication user.

appointmentsRouter.get('/' , async(request , response ) => {
    console.log("->", request.user)
    const Repositories = getCustomRepository(AppointmentRepository)
    const appointments = await Repositories.find()
    return response.json(appointments)
})

appointmentsRouter.post('/', async (request , response) => {
    try {
        const {provider_id , date} = request.body

    const parseAppoitment = parseISO(date)

    const ServiceCreateAppointments =  new CreateAppointmentsService()

    const appointment= await ServiceCreateAppointments.execute({provider_id, date: parseAppoitment})

    return response.json(appointment)
    } catch(err){
        return response.status(400).json({error : err.message})
    }
})



export default appointmentsRouter
