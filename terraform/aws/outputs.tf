output "cognito_user_pool_id" {
  value = module.cognito_user_pool.cognito_user_pool_id
}

output "cognito_user_pool_client_id" {
  value = module.cognito_user_pool.cognito_user_pool_client_id
}

output "cognito_user_pool_client_secret" {
  value     = module.cognito_user_pool.cognito_user_pool_client_secret
  sensitive = true
}

output "cognito_user_pool_issuer" {
  value = module.cognito_user_pool.cognito_user_pool_issuer
}

output "organization_table_name" {
  value = module.dynamo_db.organization_table_name
}

output "organization_table_arn" {
  value = module.dynamo_db.organization_table_arn
}

output "organization_name_index_name" {
  value = module.dynamo_db.organization_name_index_name
}


output "users_table_name" {
  value = module.dynamo_db.users_table_name
}

output "users_table_arn" {
  value = module.dynamo_db.users_table_arn
}

output "users_email_index_name" {
  value = module.dynamo_db.users_email_index_name
}

output "organization_amazon_rabbit_mq_endpoints" {
  value = module.amazon_mq.organization_amazon_rabbit_mq_endpoints
}

output "organization_amazon_rabbit_mq_console_url" {
  value = module.amazon_mq.organization_amazon_rabbit_mq_console_url
}

output "private_subnet_ids" {
  value = module.vpc.private_subnet_ids
}

output "vpc_security_group_id" {
  value = module.vpc.vpc_security_group_id
}

output "vpc_id" {
  value = module.vpc.vpc_id
}
