output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.sohnandsol-userpool.id
}

output "cognito_user_pool_client_id" {
  value = aws_cognito_user_pool_client.sohnandsol-userpoolclient.id
}

output "cognito_user_pool_client_secret" {
  value     = aws_cognito_user_pool_client.sohnandsol-userpoolclient.client_secret
  sensitive = true
}

output "cognito_user_pool_issuer" {
  value = "https://cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.sohnandsol-userpool.id}"
}
