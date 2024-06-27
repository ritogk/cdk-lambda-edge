import { JobExecutor } from './job-executor.mjs';

import type { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const result = await JobExecutor.execute(event);
  return result;
};
