output "organization_amazon_rabbit_mq_endpoints" {
  description = "Rabbit MQ uri to support event driven microservices"
  value       = aws_mq_broker.rmq.instances.0.endpoints
}

output "organization_amazon_rabbit_mq_console_url" {
  description = "The url of the Rabbit MQ Management UI"
  value       = aws_mq_broker.rmq.instances.0.console_url
}
