import * as cdk from "aws-cdk-lib";
import { ScopedAws, Stack, StackProps } from "aws-cdk-lib";
import {
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy,
  aws_cloudfront as cloudfront,
  aws_route53 as route53,
  aws_certificatemanager as acm,
  aws_cloudfront_origins,
  aws_route53_targets as route53_targets,
  aws_lambda as lambda,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkLambdaEdgeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // バケット作成
    const bucket = new s3.Bucket(this, "CreateBucket", {
      bucketName: "cdk-ritogk-lambda-edge-study-nucket",
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // CDKスタックが削除されたときにバケットを削除する（オプション）
    });

    // バケットに静的ファイルを配置
    new s3Deploy.BucketDeployment(this, "BucketUpload", {
      sources: [s3Deploy.Source.asset(path.join(__dirname, "../dist"))],
      destinationBucket: bucket,
    });

    // CloudFrontからS3にアクセスするためのIdentityを作成
    const oai = new cloudfront.OriginAccessIdentity(this, "CreateOai");

    // Lambda@Edge関数を作成
    const edgeFunction = this.createEdgeFunction();

    // CloudFrontディストリビューションを作成
    const distribution2 = new cloudfront.Distribution(this, "CreateCfDist", {
      defaultRootObject: "index.html",
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        origin: new aws_cloudfront_origins.S3Origin(bucket, {
          originAccessIdentity: oai,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [
          {
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            functionVersion: edgeFunction.currentVersion,
          },
        ],
      },
    });
  }

  private createEdgeFunction(): cloudfront.experimental.EdgeFunction {
    const functionDir = path.join(__dirname, "../functions/lambda-edge");

    const edgeFunction = new cloudfront.experimental.EdgeFunction(
      this,
      "LambdaEdgeFunction",
      {
        code: lambda.Code.fromAsset(functionDir, {
          bundling: {
            image: cdk.aws_lambda.Runtime.NODEJS_20_X.bundlingImage,
            command: [
              "bash",
              "-c",
              [
                "export npm_config_cache=$(mktemp -d)",
                // asset-output以外を作業用ディレクトリに使うと現在のバージョンで新たなバージョンを更新する挙動になりエラーになる。
                "mkdir -p /asset-output/work",
                "cp -R /asset-input/* /asset-output/work",
                "cd /asset-output/work",
                "npm i",
                `npx esbuild index.mts --define:process.env.SAMPLE_ENV="'test'" --minify --platform=node --bundle --format=esm --outfile=index.mjs --external:@aws-sdk/client-ssm --banner:js='import { createRequire as topLevelCreateRequire } from "module"; const require = topLevelCreateRequire(import.meta.url);'`,
                // commandのみの変更でエラーになるのでその対策
                "date +'// %Y-%m-%d %H:%M:%S' >> index.mjs",
                "cp index.mjs /asset-output",
                "rm -rf /asset-output/work",
              ].join(" && "),
            ],
            user: "root",
          },
        }),
        handler: "index.handler",
        description: "This is",
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      }
    );

    // console.log(`latestVersion: [${edgeFunction.latestVersion}]`);

    // command: [
    //   'bash', '-c', [
    //     `cp -R /asset-input/* /asset-output/`,
    //     `cd /asset-output`,
    //     `npm install`
    //   ].join(' && ')
    // ],
    return edgeFunction;
  }
}
