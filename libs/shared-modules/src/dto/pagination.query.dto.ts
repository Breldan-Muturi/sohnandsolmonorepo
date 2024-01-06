import { IsOptional, IsPositive } from 'class-validator';

export class PaginateQueryDto {
  @IsOptional()
  @IsPositive()
  readonly limit?: number;

  @IsOptional()
  @IsPositive()
  readonly offset?: number;
}
