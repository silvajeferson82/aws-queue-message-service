import { ListQueuesCommand } from '@aws-sdk/client-sqs';
import { QueueDTO } from './dto/queue.dto';
import { sqs } from './config/client';

export const list = async (): Promise<QueueDTO> => {
  
  const params = {};

  try {
    const request = new ListQueuesCommand(params)
    const { $metadata, QueueUrls } = await sqs.send(request);   

    return {
      status: $metadata.httpStatusCode,
      QueueUrls
    };
    
  } catch (error: any) {
    const { Error: { Message }, $metadata } = error;
    return {
      status: $metadata.httpStatusCode,
      message: Message
    };
  }
};
  
list();