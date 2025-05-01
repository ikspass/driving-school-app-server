import { PartialType } from '@nestjs/swagger';
import { CreateLectureEventDto } from './create-lecture_event.dto';

export class UpdateLectureEventDto extends PartialType(CreateLectureEventDto) {}
