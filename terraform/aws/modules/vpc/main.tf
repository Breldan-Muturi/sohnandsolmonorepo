module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.organization}-vpc"
  cidr = var.vpc_cidr_block

  azs             = var.vpc_availability_zones
  private_subnets = var.vpc_private_subnets
  public_subnets  = var.vpc_public_subnets

  enable_nat_gateway = var.vpc_enable_nat_gateway
  single_nat_gateway = var.vpc_single_nat_gateway
  enable_vpn_gateway = false

  tags = var.tags
}
