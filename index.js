import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import clientRoutes from './routes/client.js'


dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors())

app.use('/client',clientRoutes)
app.use('/general',generalRoutes)
app.use('/management',managementRoutes)
app.use('/sales',salesRoutes)

const port = process.env.PORT || 8081
mongoose.connect(process.env.URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(port,()=> console.log(`http://localhost:${port}`))
}).catch((err)=>console.log(err))