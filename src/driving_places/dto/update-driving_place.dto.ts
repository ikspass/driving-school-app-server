import { PartialType } from '@nestjs/swagger';
import { CreateDrivingPlaceDto } from './create-driving_place.dto';

export class UpdateDrivingPlaceDto extends PartialType(CreateDrivingPlaceDto) {}
