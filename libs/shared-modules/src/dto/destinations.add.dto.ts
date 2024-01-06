import { IsNotEmpty, IsString } from 'class-validator';

export class AddDestinationDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;
}
