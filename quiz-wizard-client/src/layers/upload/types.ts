export interface UploadLayer {
  uploadQuestionPicture(picture: Blob): Promise<string>
  uploadAnswerSheet(sheet: Blob): Promise<string>
}
