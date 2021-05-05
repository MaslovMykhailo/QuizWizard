export interface RecognitionPayload {
  student: number[][]
  answers: number[][]
}

export interface RecognitionLayer {
  recognize(sheetUrl: string): Promise<RecognitionPayload>
}
