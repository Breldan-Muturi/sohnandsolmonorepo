import { Controller } from '@nestjs/common';

import { PackagesService } from './services/packages.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  CreatePackageDto,
  PaginateQueryDto,
  RmqService,
} from '@sohnandsol/shared-modules';
import { SeedService } from './services/seed.service';

@Controller()
export class PackagesController {
  constructor(
    private readonly createPackageDto: CreatePackageDto,
    private readonly paginateQueryDto: PaginateQueryDto,
    private readonly packageService: PackagesService,
    private readonly seedService: SeedService,
    private readonly rmqService: RmqService
  ) {}

  @MessagePattern('get-packages')
  async getPackages(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.packageService.getPackages();
  }

  @MessagePattern('get-package-by-id')
  async getPackageById(@Ctx() context: RmqContext, @Payload() id: string) {
    this.rmqService.ack(context);

    return this.packageService.getPackageById(id);
  }

  @MessagePattern('create-package')
  async createPackage(
    @Ctx() context: RmqContext,
    @Payload() createPackageDto: CreatePackageDto
  ) {
    this.rmqService.ack(context);
    return this.packageService.createPackage(createPackageDto);
  }

  @MessagePattern('delete-package')
  async deletePackage(@Ctx() context: RmqContext, @Payload() id: string) {
    this.rmqService.ack(context);
    return this.packageService.deletePackage(id);
  }

  @MessagePattern('get-paginated-packages')
  async getPaginatedPackages(
    @Ctx() context: RmqContext,
    @Payload() paginateQueryDto: PaginateQueryDto
  ) {
    this.rmqService.ack(context);
    return this.packageService.getPaginatedPackages(paginateQueryDto);
  }

  @MessagePattern('seed-packages')
  async seedPackages(@Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.seedService.seedPackagesData();
  }
}
