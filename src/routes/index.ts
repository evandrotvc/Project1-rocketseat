import {Router} from 'express'
import appointmentsRouter from './appointments.routes'
import usersRouter from './user.routes'
import SessionsRouter from './sessions.routes'

const routes = Router()

// http://localhost:3333/appointmnets , após o user acessar essa rota
// será chamado o arquivo appointments.routes , que pode ter todos os métodos
routes.use('/appointments' , appointmentsRouter)
routes.use('/users' , usersRouter)
routes.use('/sessions' , SessionsRouter)

export default routes
