// agendamentos
import {Router} from 'express'
import AuthenticatedUserService from '../services/AuthenticatedUserService'
const SessionsRouter = Router()

SessionsRouter.post('/', async (request , response) => {
    try {
        const {email , password} = request.body

        const AuthenticatedUserServicee2 = new AuthenticatedUserService()

        const {user , token} = await AuthenticatedUserServicee2.execute({email , password})

        delete user.password
        return response.json({user , token})
    } catch(err){
        return response.status(400).json({error : err.message})
    }
})



export default SessionsRouter
