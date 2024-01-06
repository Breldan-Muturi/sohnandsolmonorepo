resource "aws_cognito_user_pool" "sohnandsol-userpool" {
  name = var.userpoolname


  schema {
    name                     = "Email"
    attribute_data_type      = "String"
    mutable                  = true
    developer_only_attribute = false
  }

  schema {
    name                     = "PhoneNumber"
    attribute_data_type      = "String"
    mutable                  = true
    developer_only_attribute = false
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  auto_verified_attributes = ["email"]


  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = false
    require_symbols   = true
    require_uppercase = true
  }

  username_attributes = ["email"]

  username_configuration {
    case_sensitive = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
}

resource "aws_cognito_user_pool_domain" "sohnandsol-userpooldomain" {
  domain       = "${var.userpoolname}domain" # This will be your domain within the auth.[region].amazoncognito.com
  user_pool_id = aws_cognito_user_pool.sohnandsol-userpool.id
}


resource "aws_cognito_user_pool_client" "sohnandsol-userpoolclient" {
  name                                 = "${var.userpoolname}client"
  user_pool_id                         = aws_cognito_user_pool.sohnandsol-userpool.id
  supported_identity_providers         = ["COGNITO"]
  explicit_auth_flows                  = ["ALLOW_USER_SRP_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_PASSWORD_AUTH"]
  generate_secret                      = false
  callback_urls                        = var.callbackurls
  prevent_user_existence_errors        = "LEGACY"
  refresh_token_validity               = 1
  access_token_validity                = 1
  id_token_validity                    = 1
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["phone", "email", "openid", "profile", "aws.cognito.signin.user.admin"]
  allowed_oauth_flows_user_pool_client = true
  token_validity_units {
    access_token  = "hours"
    id_token      = "hours"
    refresh_token = "hours"
  }
}
