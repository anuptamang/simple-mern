import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))

app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => console.log(error))
