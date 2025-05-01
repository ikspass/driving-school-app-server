import { PartialType } from '@nestjs/swagger';
import { CreateTestEventDto } from './create-test_event.dto';

export class UpdateTestLessonDto extends PartialType(CreateTestEventDto) {}
