variable "region" {
  description = "This is the AWS region we are deploying our monorepo to"
  type        = string
  default     = "us-east-1"
}

variable "organization" {
  description = "Organization name to be used for related resources"
  type        = string
  default     = "sohnandsol"
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
  default = {
    "Environment" = "Development"
    "Terraform"   = true
  }
}
