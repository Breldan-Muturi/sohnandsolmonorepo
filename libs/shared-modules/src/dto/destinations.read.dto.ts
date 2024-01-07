import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ReadDestinationsDto {
  @IsNotEmpty()
  @IsString()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly packagesCount: number;
}
