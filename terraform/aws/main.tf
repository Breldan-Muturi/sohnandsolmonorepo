terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.25"
    }
  }
}

provider "aws" {
  region = var.region
}

module "cognito_user_pool" {
  source = "./modules/cognito"
  region = var.region
}

module "dynamo_db" {
  source       = "./modules/dynamodb"
  organization = var.organization
  tags         = var.tags
}

module "amazon_mq" {
  source       = "./modules/amazonMQ"
  organization = var.organization
  subnet_ids   = module.vpc.private_subnet_ids
  # security_group_ids = [module.vpc.vpc_security_group_id]
  vpc_id = module.vpc.vpc_id
}

module "vpc" {
  source       = "./modules/vpc"
  tags         = var.tags
  organization = var.organization
}
