import fs from 'fs'
import path from 'path'

import md5 from 'md5'
import fetch from 'node-fetch'
import {RequestHandler} from 'express'

export const handleDeliver = (
  port: string | number,
  staticPath: string,
  sectionPath: string
): RequestHandler => (req, res) => {
  const url = req.body[sectionPath]
  console.log(url, req.body)
  fetch(url)
    .then((response) => response.buffer())
    .then((buffer) => {
      const fileName = `${md5(buffer)}.${url.split('.').pop()}`
      const filePath = path.resolve(process.cwd(), staticPath, sectionPath, fileName)
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          return res.status(500).send(err)
        }

        const fileStaticUrl = `http://localhost:${port}/${staticPath}/${sectionPath}/${fileName}`
        console.log('\nFile delivered:\n' + fileStaticUrl)

        res.send(fileStaticUrl)
      })
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
