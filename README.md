# Serverless implementation

The serverless implementation of the API endpoints defined in the [API specification](https://github.com/frameworks-serverless-performance/api-specification), used for performance testing in the thesis *Performance and price comparison of three popular backend frameworks and the AWS serverless stack*.

This repostitory contains the SAM template and function code for deploying the serverless application to AWS.

## How to use
### Prerequisites
To test or deploy the application, you need to have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed on your computer.

You also need to configure the AWS CLI with IAM credentials. To do this, create the credentials in IAM and run `aws configure`, which will promt you for the access key and secret key.

### Testing locally
To run the application locally, follow these steps:
1. Clone this repository
2. Open a terminal in the directory of the repository
3. Run `sam build`
4. Run `sam local start-api --port <choose-a-port> --region <your-aws-region>`
5. The endpoints should now be accessible under `http://localhost:<port>/api/<enpoint>`

Note that the `/getPrice` and `/query` endpoints need a local instance of DynamoDB to work (the correct tables with the data also need to exist). Instructions on how to easily deploy a DynamoDB instance as a docker container can be found [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html).

### Deploying the application
To deploy the application, follow these steps
1. Clone this repository
2. Open a terminal in the directory of the repository
3. Run `sam deploy --guided`
4. Follow the instructions and dismiss the warnings about the endpoints not requiring authentication (we do not want to set up authentication, as this could impact performance)
5. Wait for the deployment to finish (can take a while)
6. Navigate to the IAM dashboard in the AWS console and locate the `api-getPriceRole` and `api-queryRole` roles
7. Add DynamoDB read permissions to both roles (this allows the respective Lambda functions to read DynamoDB data)
8. Navigate to the API Gateway resource and navigate to _API settings_
9. The URL of the API Gateway is listed under _Default endpoint_

You can now access the endpoints under `<gateway-url>/api/<endpoint>`.

> :warning: **Warning**: Since there is no authentication required for any of the endpoints, the API is now **publicly accessible under the API Gateway URL**. To avoid this, you can disable the default endpoint and connect the API Gateway to a private VPC (ideally the VPC that your performance testing instance is in).
