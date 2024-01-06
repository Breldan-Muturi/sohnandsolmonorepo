import { Injectable } from '@nestjs/common';
import {
  PackagesRepository,
  TourOperatorsEntity,
  TourOperatorsRepository,
} from '@sohnandsol/shared-modules';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    private readonly tourOperatorsRepository: TourOperatorsRepository,
    private readonly packagesRepository: PackagesRepository
  ) {}

  async seedTourOperators(): Promise<TourOperatorsEntity[]> {
    const numberOfOperators = 9;
    const packages = await this.packagesRepository.findAll();
    const packagesPerOperator = Math.floor(packages.length / numberOfOperators);
    let extraPackages = packages.length % numberOfOperators;
    const savedTourOperators: TourOperatorsEntity[] = [];

    for (let i = 0; i < numberOfOperators; i++) {
      const tourOperator: Partial<TourOperatorsEntity> = {
        name: faker.company.name(),
        image: faker.image.urlPicsumPhotos({ width: 128, height: 128 }),
      };

      const savedTourOperator = await this.tourOperatorsRepository.save(
        tourOperator
      );
      const tourOperatorPackages: TourOperatorsEntity['packages'] = [];

      // Determine the number of packages for this operator
      const numPackages = packagesPerOperator + (extraPackages > 0 ? 1 : 0);
      extraPackages--;

      // Assign packages to this tour operator
      for (let j = 0; j < numPackages; j++) {
        const packageEntity = packages.shift();
        packageEntity.tourOperator = savedTourOperator;
        tourOperatorPackages.push(packageEntity);
        await this.packagesRepository.save(packageEntity);
      }

      // Update the tourOperator with its packages
      savedTourOperator.packages = tourOperatorPackages;
      await this.tourOperatorsRepository.save(savedTourOperator);
      savedTourOperators.push(savedTourOperator);
    }

    return savedTourOperators;
  }
}
