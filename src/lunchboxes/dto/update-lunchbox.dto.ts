import { PartialType } from '@nestjs/mapped-types';
import { CreateLunchboxDto } from './create-lunchbox.dto';

export class UpdateLunchboxDto extends PartialType(CreateLunchboxDto) {}
