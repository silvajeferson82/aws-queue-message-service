import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { getQueue } from '../sqs_getqueueurl';
import { QueueDTO } from '../dto/queue.dto';
import { sqs } from '../config/client';

export const sendMessage = async (queueUrlPrefix: string, messageBody: string): Promise<QueueDTO> => {

  const result = await getQueue(queueUrlPrefix);
  
  if (result.status !== 200) {
    return {
      status: result.status,
      message: result.message,
    };
  }

  const params = {
    delaySeconds: 10,
    messageAtrributes: {
      Title: {
        DataType: 'String',
        StringValue: 'The Whistler'
      },
      Author: {
        DataType: "String",
        StringValue: "John Grisham"
      },
      WeeksOn: {
        DataType: "Number",
        StringValue: "6"
      }
    },
    QueueUrl: result.QueueUrl,
    MessageBody: messageBody,
    MessageGroupId: 'test'
  };

  try {
    const request = new SendMessageCommand(params)
    const { $metadata, MessageId } = await sqs.send(request);
    
    return {
      status: $metadata.httpStatusCode,
      message: 'Success',
      MessageId: MessageId
    };
    
  } catch (error: any) {
    const { Error: { Message }, $metadata } = error;
    return {
      status: $metadata.httpStatusCode,
      message: Message
    };
  }
};

sendMessage('SQS_TEST_QUEUE', 'Hello world!');