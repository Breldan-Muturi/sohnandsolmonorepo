variable "organization" {
  description = "Organization name to be used for related resources"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for the Amazon MQ Broker"
  type        = list(string)
}

# variable "security_group_ids" {
#   description = "Security Group IDs for the Amazon MQ Broker"
#   type        = list(string)
# }

variable "vpc_id" {
  description = "VPC ID for the RabbitMQ VPC"
  type        = string
}
