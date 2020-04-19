import Appointment from '../models/Appointment'
import RepositoryAppointments from '../repositories/AppointmentRepository'
import {startOfHour} from 'date-fns'

interface RequestDTO {
    provider : string;
    date: Date;
}

class CreateAppointmentService  {
    private RepositoryAppointments : RepositoryAppointments

    constructor(RepositoryAppointments : RepositoryAppointments){
        this.RepositoryAppointments = RepositoryAppointments
    }
    public execute({provider , date} : RequestDTO) : Appointment {
        const parseDate = startOfHour(date)

    const findAppointmentInSameDate = this.RepositoryAppointments.findByDate(parseDate)

    if(findAppointmentInSameDate){
        throw Error('This appointment is already booked.')
        // return response.status(400).json({message: "This date is already booked."})
    }

    const appointment = this.RepositoryAppointments.create({
        provider ,
        date: parseDate
    })

    return appointment
    }
}

export default CreateAppointmentService
