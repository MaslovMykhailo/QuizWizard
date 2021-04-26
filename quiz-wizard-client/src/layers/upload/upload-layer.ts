import {UploadLayer} from './types'

export const createUploadLayer = (
  baseUrl = 'http://localhost:5000/upload'
): UploadLayer => {
  const baseUpload = (type: string, image: Blob) => {
    const body = new FormData()
    body.append(type, image)

    return fetch(`${baseUrl}/${type}/`, {method: 'POST', body})
      .then(response => response.text())
  }

  return {
    uploadAnswerSheet: (sheet: Blob) => baseUpload('answer-sheet', sheet),
    uploadQuestionPicture: (picture: Blob) => baseUpload('question-picture', picture)
  }
}
