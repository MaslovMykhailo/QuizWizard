import path from 'path'

import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'

import {handleUpload} from './upload'

const {parsed: {
  PORT = 3000,
  STATIC_PATH = 'static'
} = {}} = dotenv.config()

const app = express()

app.use(cors())

app.use('/static', express.static(path.resolve(STATIC_PATH)))

app.use(fileUpload())

app.post('/upload/answer-sheet', handleUpload(PORT, STATIC_PATH, 'answer-sheet'))
app.post('/upload/question-picture', handleUpload(PORT, STATIC_PATH, 'question-picture'))

app.listen(PORT, () => {
  console.log(`Static server is running on port: ${PORT}`)
})
