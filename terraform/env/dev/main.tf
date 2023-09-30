terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.24"
    }
  }

  backend "s3" {
    region  = "ap-northeast-1"
    bucket  = "okamura-terraform-bucket"
    key     = "jobcan-terraform/env/dev/terraform.tfstate"
    encrypt = true
  }
}

data "aws_region" "self" {}
data "aws_caller_identity" "self" {}

locals {
  app_name     = "jobcan"
  env          = "dev"
  service_name = "${local.app_name}-${local.env}"

  main_region = data.aws_region.self.name
}

module "aws" {
  source = "../../modules/aws"

  app_name     = local.app_name
  env          = local.env
  service_name = local.service_name
}
