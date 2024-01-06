resource "aws_dynamodb_table" "organizations" {
  name         = "${var.organization}-Organizations"
  billing_mode = var.billing_mode
  hash_key     = "organizationId"

  attribute {
    name = "organizationId"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  // Defining a global secondary index to query by names
  global_secondary_index {
    name            = "nameIndex"
    hash_key        = "name"
    projection_type = "ALL"
    read_capacity   = var.read_capacity
    write_capacity  = var.write_capacity
  }

  tags = var.tags

}

resource "aws_dynamodb_table" "users" {
  name = "${var.organization}-Users"
  billing_mode = var.billing_mode
  hash_key     = "userId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  //Defining a global secondary index to query by emails
  global_secondary_index {
   name = "emailIndex"
   hash_key = "email"
   projection_type = "ALL"
   read_capacity = var.read_capacity
   write_capacity = var.write_capacity  
  }

  tags = var.tags
}
