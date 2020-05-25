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
  const lastNotEmptyLine = Math.max(
    ...result.answers.filter((options: string[]) => options.length)
  )

  const answers = result.answers.splice(0, lastNotEmptyLine + 1)
  const sheetBase64 = result.sheetBase64
  const responderId =
    result.responderId?.length === 3
      ? result.responderId?.map((id: number[]) => id[0]).join('')
      : undefined

  return {
    answers,
    sheetBase64,
    responderId
  }
}
