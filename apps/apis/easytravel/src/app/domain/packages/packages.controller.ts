import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PACKAGES_SERVICE } from '../../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePackageDto, PaginateQueryDto } from '@sohnandsol/shared-modules';

@Controller('packages')
export class PackagesController {
  constructor(
    @Inject(PACKAGES_SERVICE) private readonly packagesService: ClientProxy,
    private readonly createPackageDto: CreatePackageDto,
    private readonly paginatedQueryDto: PaginateQueryDto
  ) {}
  @Get()
  getPackages() {
    return this.packagesService.send('get-packages', {});
  }

  @Get('paginated')
  getPaginatedPackages(@Query() paginateQueryDto: PaginateQueryDto) {
    return this.packagesService.send(
      'get-paginated-packages',
      paginateQueryDto
    );
  }

  @Get(':id')
  getPackageById(@Param('id') id: string) {
    return this.packagesService.send('get-package-by-id', id);
  }

  @Post()
  createPackage(@Body() createPackageDto: CreatePackageDto) {
    return this.packagesService.send('create-package', createPackageDto);
  }

  @Post('seed')
  seedPackages() {
    return this.packagesService.send('seed-packages', {});
  }

  @Delete(':id')
  deletePackage(@Param('id') id: string) {
    return this.packagesService.send('delete-package', id);
  }
}
