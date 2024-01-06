output "organization_table_name" {
  description = "The name of the organization table in DynamoDB"
  value       = aws_dynamodb_table.organizations.name
}

output "organization_table_arn" {
  description = "The ARN of the organization table in DynamoDB"
  value       = aws_dynamodb_table.organizations.arn
}

output "organization_name_index_name" {
  description = "The name of the global seconfary index for organization names"
  value       = "nameIndex"
}

output "users_table_name" {
  description = "The name of the users table in DynamoDB."
  value       = aws_dynamodb_table.users.name
}

output "users_table_arn" {
  description = "The ARN of the users table in DynamoDB"
  value       = aws_dynamodb_table.users.arn
}

output "users_email_index_name" {
  description = "The name of the global secondary index for user emails"
  value       = "emailIndex"
}
