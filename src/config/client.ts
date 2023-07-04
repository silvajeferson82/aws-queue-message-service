import { SQSClient } from '@aws-sdk/client-sqs';
require('dotenv').config();

const sqs = new SQSClient({
  region: 'us-east-1',
  apiVersion: '2012-11-05',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string
  }
});

export { sqs }