import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv';

//Routes import
import lecteurRoute from './routes/lecteurRoute.js'
import livreRoute from './routes/livreRoute.js'

const app = express();

app.use(express.json())
app.use(cors())

dotenv.config();

const port = process.env.PORT
const database_url = process.env.DB_CONNECT

mongoose.connect(database_url)
    .then(()=>console.log(`database connected`))
    .then(()=> app.listen(port))
    .then(()=>console.log(`server running on port:${port}`))
    .catch(err => console.log(err))

//Routes
app.use('/lecteur', lecteurRoute)
app.use('/livre', livreRoute)
