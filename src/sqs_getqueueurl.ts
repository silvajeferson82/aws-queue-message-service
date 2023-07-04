import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { QueueDTO } from './dto/queue.dto';
import { sqs } from './config/client';

export const getQueue = async (queueName: string): Promise<QueueDTO> => {
    
  const params = {
    QueueName: `${queueName}.fifo`
  };

  try {
    const request = new GetQueueUrlCommand(params)
    const { $metadata, QueueUrl } = await sqs.send(request);
    
    return {
      status: $metadata.httpStatusCode,
      message: 'Success',
      QueueUrl
    };
    
  } catch (error: any) {
    const { Error: { Message }, $metadata } = error;
    return {
      status: $metadata.httpStatusCode,
      message: Message
    };
  }
};

// getQueue('SQS_TEST_QUEUE');