import {startOfHour} from 'date-fns'
import {getCustomRepository} from 'typeorm'
import Appointment from '../models/Appointment'
import RepositoryAppointments from '../repositories/AppointmentRepository'
// import AppointmentRepository from '../repositories/AppointmentRepository'


interface RequestDTO {
    provider_id : string;
    date: Date;
}

class CreateAppointmentService  {
    public async execute({provider_id , date} : RequestDTO) : Promise<Appointment> {
        const appointmentRepository = getCustomRepository(RepositoryAppointments)

        const parseDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentRepository.findByDate(parseDate)

    if(findAppointmentInSameDate){
        throw Error('This appointment is already booked.')
        // return response.status(400).json({message: "This date is already booked."})
    }

    const appointment = appointmentRepository.create({ //cria instância no banco
        provider_id ,
        date: parseDate
    })
    await appointmentRepository.save(appointment) // salva no banco
    return appointment
    }
}

export default CreateAppointmentService
