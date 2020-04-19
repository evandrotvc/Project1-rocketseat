import Appointment from '../models/Appointment'
import {isEqual} from 'date-fns'

interface createAppointmentDTO {
    provider : string;
    date : Date;
}

class AppointmentRepository {
    private appointments : Appointment[]

    constructor() {
        this.appointments = []
    }
    public findByDate(date : Date):Appointment | null {
      const findAppointments =   this.appointments.find(elem => isEqual(elem.date , date))

        return findAppointments || null
    }


    public create({provider , date } : createAppointmentDTO): Appointment {
        const appointment = new Appointment({provider , date})
        this.appointments.push(appointment)
        return appointment
    }
    public index(): Appointment[]{
        return this.appointments
    }
}

export default AppointmentRepository
