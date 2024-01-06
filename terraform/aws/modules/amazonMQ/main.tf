# To Do: Add AWS Amazon MQ with Rabbit MQ
resource "aws_security_group" "rmq_sg" {
  name        = "${var.organization}-rmqSG"
  description = "Security group for Rabbit MQ"
  vpc_id      = var.vpc_id
  # Ingress rules for RabbitMQ web console and AMQP over TLS
  ingress {
    from_port   = 15672
    to_port     = 15672
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 5671
    to_port     = 5671
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Replace with your actual IP address
  }

  # Default egress rule: Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.organization}-rmqSG"
  }
}

resource "aws_mq_broker" "rmq" {
  broker_name        = "${var.organization}-amazonMQ"
  engine_type        = "RabbitMQ"
  engine_version     = "3.11.20"
  host_instance_type = "mq.t3.micro"
  user {
    username = "${var.organization}-rmq_admin"
    password = "5unriSe@2297"
  }
  # deployment_mode = "ACTIVE_STANDBY_MULTI_AZ"
  subnet_ids          = [element(var.subnet_ids, 0)]
  # security_groups     = var.security_group_ids
  publicly_accessible = true
}
