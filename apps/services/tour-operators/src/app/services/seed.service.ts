import { Injectable } from '@nestjs/common';
import {
  // PackagesRepository,
  ReviewEntity,
  ReviewsRepository,
  // TourOperatorsEntity,
  TourOperatorsRepository,
} from '@sohnandsol/shared-modules';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    private readonly tourOperatorsRepository: TourOperatorsRepository,
    private readonly reviewsRepository: ReviewsRepository
  ) {}

  async seedTourOperators() {
    const tourOperators = await this.tourOperatorsRepository.findAll();

    for (const operator of tourOperators) {
      const numberOfReviews = faker.number.int({ min: 2, max: 9 });
      for (let i = 0; i < numberOfReviews; i++) {
        const review: Partial<ReviewEntity> = {
          rating: faker.number.int({ min: 1, max: 5 }),
          reviewDate: faker.date.between({
            from: '2019-01-02',
            to: '2024-01-02',
          }),
          reviewPhotos: this.generatePhotos(),
          review: faker.lorem.sentences({ min: 1, max: 3 }),
          tourOperator: operator,
        };

        await this.reviewsRepository.save(review);
      }
    }
  }

  private generatePhotos(): string[] {
    const numberOfPhotos = faker.number.int({ min: 1, max: 4 });
    return Array.from({ length: numberOfPhotos }, () =>
      faker.image.urlLoremFlickr({ category: 'travel' })
    );
  }
}
