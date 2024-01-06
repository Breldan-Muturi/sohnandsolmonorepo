import { Injectable, Logger } from '@nestjs/common';
import { Organization } from './org.entity';
import {
  DynamoDBClient,
  // GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class OrganizationService {
  private readonly tableName: string = process.env.TABLE_NAME;
  private readonly client: DynamoDBClient;
  private readonly logger = new Logger(OrganizationService.name);

  constructor() {
    this.client = new DynamoDBClient({ region: process.env.REGION });
  }

  // async findAll() {
  //   // Add an Organization entity and set result:Organization
  //   const result: Organization[] = [];

  //   const command = new ScanCommand({
  //     TableName: this.tableName,
  //   });

  //   const response = await this.client.send(command);

  //   if (response.Items) {
  //     response.Items.forEach((item) => {
  //       result.push(Organization.newInstanceFromDynamoDBObject(item));
  //     });
  //   }

  //   return result;
  // }

  // To Do: Optimize how to return the organizationId
  async getUserOrganization(
    userId: string
  ): Promise<Organization['organizationId']> {
    // Scan the tables for organizations where the userId is present
    const matchOrganizations: Organization[] = [];
    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression: 'contains(userIds, :userId)',
      ExpressionAttributeValues: {
        ':userId': { S: userId },
      },
    });

    try {
      const response = await this.client.send(command);
      if (response.Items) {
        response.Items.forEach((item) => {
          matchOrganizations.push(
            Organization.newInstanceFromDynamoDBObject(item)
          );
        });
        // Get the first organization where the user is a member
        const firstOrganizationId = matchOrganizations[0].organizationId;
        return firstOrganizationId;
      } else {
        return null;
      }
    } catch (error) {
      this.logger.error('Error fetching organizations', error);
      throw error;
    }
  }

  // async findById(organizationId: string) {
  //   const command = new GetItemCommand({
  //     TableName: this.tableName,
  //     Key: {
  //       organizationId: { S: organizationId },
  //     },
  //   });

  //   const result = await this.client.send(command);
  //   if (result.Item) {
  //     return Organization.newInstanceFromDynamoDBObject(result.Item);
  //   }
  //   return undefined;
  // }
}
