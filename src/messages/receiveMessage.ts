import { ReceiveMessageCommand } from '@aws-sdk/client-sqs';
import { getQueue } from '../sqs_getqueueurl';
import { QueueDTO } from '../dto/queue.dto';
import { sqs } from '../config/client';


export const receiveMessage = async (queueUrlPrefix: string): Promise<QueueDTO> => { 

  const result = await getQueue(queueUrlPrefix);
  
  if (result.status !== 200) {
    return {
      status: result.status,
      message: result.message,
    }
  }

  const params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 3,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: result.QueueUrl,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  };

  try {
    const request = new ReceiveMessageCommand(params)
    const { $metadata, Messages } = await sqs.send(request);
    console.log(Messages);
    return {
      status: $metadata.httpStatusCode,
      messages: Messages
    } ;
  } catch (error: any) {
    const { Error: { Message }, $metadata } = error;
    return {
      status: $metadata.httpStatusCode,
      message: Message
    };
  }

}

receiveMessage('SQS_TEST_QUEUE');