import { CreateQueueCommand } from '@aws-sdk/client-sqs';
import { QueueDTO } from './dto/queue.dto';
import { sqs } from './config/client';



export const create = async (queueName: string): Promise<QueueDTO> => {

  const params = {
    QueueName: `${queueName}.fifo`,
    Attributes: {
      'DelaySeconds': '0',
      'MessageRetentionPeriod': '86400',
      'FifoQueue': 'true',
      'ContentBasedDeduplication': 'true',
      'ReceiveMessageWaitTimeSeconds': '20'
    }
  };

  try {
    const request = new CreateQueueCommand(params);
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

create('SQS_TEST2_QUEUE');