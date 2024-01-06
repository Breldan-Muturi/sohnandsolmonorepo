variable "region" {
  description = "The AWS region where the resources will be created."
  type        = string
}

variable "userpoolname" {
  description = "The name of the cognito user pool"
  type        = string
  default     = "sohnandsol-userpool"
}

variable "callbackurls" {
  description = "The callbackurl for cognito user pool client"
  type        = set(string)
  default     = ["http://localhost:3000/api/auth/callback/cognito"]
}
