export class CreateLectureEventDto {
  readonly date: Date
  readonly time: string
  readonly teacherId: number
  readonly groupId: number
  readonly topicId: number
}
