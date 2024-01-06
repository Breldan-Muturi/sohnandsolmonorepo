import { Injectable, Logger } from '@nestjs/common';
import {
  AddDestinationDto,
  // Ammenity,
  CreatePackageDto,
  // DestinationEntity,
  DestinationsRepository,
  // PackageEntity,
  PackagesRepository,
} from '@sohnandsol/shared-modules';
// import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly createPackageDto: CreatePackageDto,
    private readonly addDestinationDto: AddDestinationDto,
    private readonly destinationRepository: DestinationsRepository,
    private readonly packageRepository: PackagesRepository
  ) {}

  async seedPackagesData() {
    this.logger.log('Starting to seed packages data');

    const baseDate = new Date('2024-01-14');

    const packages = await this.packageRepository.findAll();

    // Assign a unique title for each of the packages
    for (const packageEntity of packages) {
      // Generate a random duration between 4 and 14 days
      const randomDuration = Math.floor(Math.random() * 11) + 4;

      const startDateOffset = Math.floor(Math.random() * 200) + 1;
      const startDate = new Date(baseDate.getTime());
      startDate.setDate(startDate.getDate() + startDateOffset);

      const endDate = new Date(startDate.getTime());
      endDate.setDate(endDate.getDate() + randomDuration);

      packageEntity.startDate = startDate;
      packageEntity.endDate = endDate;

      // Saved the updated packageEntity
      await this.packageRepository.save(packageEntity);
    }

    this.logger.log('Completed updating packages');
    return 'This will seed data for packages';
  }
}
