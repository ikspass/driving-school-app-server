import { PartialType } from '@nestjs/mapped-types';
import { CreateQualDto } from './create-qual.dto';

export class UpdateQualDto extends PartialType(CreateQualDto) {}
