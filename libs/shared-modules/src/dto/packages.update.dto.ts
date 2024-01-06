import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDto } from './packages.create.dto';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {}
