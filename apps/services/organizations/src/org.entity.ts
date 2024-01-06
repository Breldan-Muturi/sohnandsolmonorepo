export class Organization {
  organizationId: string;
  name: string;
  logo?: string;

  static newInstanceFromDynamoDBObject(data: any): Organization {
    const result = new Organization();
    result.organizationId = data.organizationId.S;
    result.name = data.name.S;
    result.logo = data?.logo?.S;
    return result;
  }
}
