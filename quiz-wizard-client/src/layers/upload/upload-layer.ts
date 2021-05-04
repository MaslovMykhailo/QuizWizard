import {UploadLayer} from './types'

export const createUploadLayer = (
  baseUrl = 'http://localhost:5000'
): UploadLayer => {
  const baseUpload = (type: string, image: Blob) => {
    const body = new FormData()
    body.append(type, image)

    return fetch(`${baseUrl}/upload/${type}/`, {method: 'POST', body})
      .then(response => response.text())
  }

  const baseDeliver = (type: string, url: string) => {
    if (!url.startsWith(baseUrl)) {
      const body = new FormData()
      body.append(type, url)

      return fetch(`${baseUrl}/deliver/${type}/`, {method: 'POST', body})
        .then(response => response.text())
    }
    return Promise.resolve(url)
  }

  const upload = (type: string, target: string | Blob) =>
    target instanceof Blob ?
      baseUpload(type, target) :
      baseDeliver(type, target)

  return {
    uploadAnswerSheet: (sheet: string | Blob ) => upload('answer-sheet', sheet),
    uploadQuestionPicture: (picture: string | Blob) => upload('question-picture', picture)
  }
}
