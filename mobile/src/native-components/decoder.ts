import {DecodedResult} from '@types'

import {OpenCV} from './open-cv'

export const Decoder = {
  decode: (pictureBase64: string) =>
    new Promise<DecodedResult>((resolve, reject) => {
      OpenCV.decodeImage(
        pictureBase64,
        (error: unknown) => {
          reject(error)
        },
        (result: string) => {
          resolve(normalizeDecodingResult(JSON.parse(result)))
        }
      )
    })
}

const normalizeDecodingResult = (result: any): DecodedResult => {
  if (result.responderId.length !== 3) {
    delete result.responderId
  }

  return {
    ...result,
    responderId: result.responderId?.map((id: number[]) => id[0]).join('')
  }
}
