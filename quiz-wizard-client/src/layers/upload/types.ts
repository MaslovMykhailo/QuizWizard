export interface UploadLayer {
  uploadQuestionPicture(picture: string | Blob): Promise<string>
  uploadAnswerSheet(sheet: string | Blob): Promise<string>
}
