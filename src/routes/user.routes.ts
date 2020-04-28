// agendamentos
import {Router} from 'express'
import CreateUserService from '../services/CreateUserService'
const UsersRouter = Router()

// const RepositoryAppointments = new AppointmentRepository()


UsersRouter.post('/', async (request , response) => {
    try {
        const {email , name , password}= request.body
        const CreateUser = new CreateUserService()

       const user = await CreateUser.execute({name , email, password})

       delete user.password
        return response.json(user)
    } catch(err){
        return response.status(400).json({error : err.message})
    }
})



export default UsersRouter
