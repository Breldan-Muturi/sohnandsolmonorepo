import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  AddDestinationDto,
  CreatePackageDto,
  PackageEntity,
  PackagesRepository,
  PaginateQueryDto,
  DestinationsRepository,
} from '@sohnandsol/shared-modules';

@Injectable()
export class PackagesService {
  private readonly logger = new Logger(PackagesService.name);
  constructor(
    private readonly packagesRepository: PackagesRepository,
    private readonly destinationRepository: DestinationsRepository,
    private readonly createPackageDto: CreatePackageDto,
    private readonly paginateQueryDto: PaginateQueryDto,
    private readonly addDestinationDto: AddDestinationDto
  ) {}

  async getPackages(): Promise<PackageEntity[]> {
    return await this.packagesRepository.findAll({
      relations: ['destinations'],
    });
  }

  async getPackageById(id: string): Promise<PackageEntity> {
    return this.packagesRepository.findOneById(id);
  }

  async createPackage(
    createPackageDto: CreatePackageDto,
    newRelations?: boolean
  ): Promise<PackageEntity> {
    try {
      const destinationEntities = await this.addDestinations(
        createPackageDto.destinations,
        newRelations
      );

      // Create a new package entity with the converted ammenities
      const packageEntity = this.packagesRepository.create({
        ...createPackageDto,
        destinations: destinationEntities,
      });
      return await this.packagesRepository.save(packageEntity);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deletePackage(id: string) {
    const packageDeleted = await this.getPackageById(id);
    if (!packageDeleted)
      throw new NotFoundException('This package does not exist');
    return await this.packagesRepository.remove(packageDeleted);
  }

  async getPaginatedPackages(
    paginateQueryDto: PaginateQueryDto
  ): Promise<[PackageEntity[], number]> {
    return await this.packagesRepository.findPaginated(paginateQueryDto, {
      relations: ['destinations'],
    });
  }
  // To Do: Use the base repository for this.
  private async addDestinations(
    addDestinationDtos: AddDestinationDto[],
    newRelations?: boolean
  ): Promise<AddDestinationDto[]> {
    const destinationEntities = await Promise.all(
      addDestinationDtos.map(async (addDestinationDto) => {
        const { name } = addDestinationDto;
        const destinationEntity =
          await this.destinationRepository.findByCondition({
            where: { name },
          });
        if (!destinationEntity) {
          if (!newRelations) {
            throw new NotFoundException(`Destination ${name} does not exist`);
          } else {
            return this.destinationRepository.create(destinationEntity);
          }
        }
        return destinationEntity;
      })
    );
    return destinationEntities;
  }
}
