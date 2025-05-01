import { PartialType } from '@nestjs/swagger';
import { CreateDrivingEventDto } from './create-driving_event.dto';

export class UpdateDrivingEventDto extends PartialType(CreateDrivingEventDto) {}
