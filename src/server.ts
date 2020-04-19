import express from 'express'
import routes from './routes'
const app = express()

app.use(express.json())
app.use(routes) // adicionando todas as rotas definidas no arquvi routes dentro do app
app.listen(3333, () =>{
    console.log("server start port 3333")
})
