resource "aws_ecr_repository" "jobcan-scraping-lambda-repo" {
  name = "${var.service_name}-scraping-lambda"
  image_scanning_configuration {
    scan_on_push = true
  }
}