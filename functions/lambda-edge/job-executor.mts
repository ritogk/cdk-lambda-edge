import { CloudFrontRequestEvent } from "aws-lambda";
import { minimatch } from "minimatch";
export class JobExecutor {
  public static async execute(event: CloudFrontRequestEvent) {
    console.log(minimatch);
    const request = event.Records[0].cf.request;
    const uri = request.uri;
    console.log("★★★★★");
    console.log(process.env.SAMPLE_ENV);
    console.log(uri);
    return request;
  }
}
