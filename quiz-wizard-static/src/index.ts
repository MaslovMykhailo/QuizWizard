import path from 'path'

import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'

const {parsed: {
  PORT = 3000,
  STATIC_PATH = 'static'
} = {}} = dotenv.config()

const app = express()

app.use('/static', express.static(path.resolve(STATIC_PATH)))

app.use(fileUpload())

app.post('/upload', function (req, res) {
  if (!req.files || !Object.keys(req.files).length) {
    return res.status(400).send('No files')
  }

  const file = req.files.uploadFile

  if (Array.isArray(file)) {
    return res.status(400).send('Multiple files')
  }

  const filePath = path.resolve(process.cwd(), STATIC_PATH, file.name)
  file.mv(filePath, function (err) {
    if (err) {
      return res.status(500).send(err)
    }

    res.send(path.resolve('http://localhost:5000', STATIC_PATH, file.name))
  })
})

app.listen(PORT, () => {
  console.log(`Static server is running on port: ${PORT}`)
})
