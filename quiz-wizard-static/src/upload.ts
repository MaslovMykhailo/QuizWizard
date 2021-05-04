import path from 'path'

import {RequestHandler} from 'express'

export const handleUpload = (
  port: string | number,
  staticPath: string,
  sectionPath: string
): RequestHandler => (req, res) => {
  if (!req.files || !Object.keys(req.files).length) {
    return res.status(400).send('No files')
  }

  const file = req.files[sectionPath]

  if (Array.isArray(file)) {
    return res.status(400).send('Multiple files')
  }

  const fileName = `${file.md5}.${file.name.split('.').pop()}`
  const filePath = path.resolve(process.cwd(), staticPath, sectionPath, fileName)

  file.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    const fileStaticUrl = `http://localhost:${port}/${staticPath}/${sectionPath}/${fileName}`
    console.log('\nFile uploaded:\n' + fileStaticUrl)

    res.send(fileStaticUrl)
  })
}
