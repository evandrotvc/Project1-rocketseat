
import { Repository, EntityRepository} from 'typeorm'

import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {

    public async findByDate(date : Date): Promise<Appointment | null> {
      const findAppointments =  await this.findOne({
          where: {date},
      })

        return findAppointments || null
    }

}

export default AppointmentRepository
