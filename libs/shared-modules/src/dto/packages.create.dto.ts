import {
  ArrayNotEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddDestinationDto } from './destinations.add.dto';
import { Ammenity } from '../enums/ammenity.enum';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly about: string;

  @IsNotEmpty({ message: 'At least one destination must be provided' })
  @ValidateNested({ each: true })
  @Type(() => AddDestinationDto)
  readonly destinations: AddDestinationDto[];

  @ArrayNotEmpty({ message: 'At least one entity must be provided' })
  @IsEnum(Ammenity, { each: true, message: 'Invalid ammenity provided' })
  readonly ammenities: Ammenity[];

  @IsString({ each: true })
  readonly photos: string[];

  @IsInt()
  @Min(0)
  @Max(20)
  readonly duration: number;
}
