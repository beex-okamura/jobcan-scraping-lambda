resource "aws_iam_role" "jobcan-basic-lambda" {
  name = "${var.service_name}-basic-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "jobcan-basic-lambda" {
  role       = aws_iam_role.jobcan-basic-lambda.name
  policy_arn = aws_iam_policy.jobcan-lambda-setup.arn
}
