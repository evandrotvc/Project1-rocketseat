import {Router} from 'express'
import appointmentsRouter from './appointments.routes'
const routes = Router()

// http://localhost:3333/appointmnets , após o user acessar essa rota
// será chamado o arquivo appointments.routes , que pode ter todos os métodos
routes.use('/appointments' , appointmentsRouter)

export default routes
