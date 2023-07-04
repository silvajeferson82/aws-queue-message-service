# [AWS] Tutorial SQS(Message Queuing Service)

##  Antes de iniciar as etapas abaixo, clone o repositorio:
```bash
  git clone https://github.com/silvajeferson82/aws-queue-message-service.git
```
## Rode o comando:
```bash
  npm install
```

### 1 - Serviço de criação, busca e listagem de filas
  - criação - Informar o nome da queue via parametro na função create('SQS_NAME_QUEUE'), e rodar o comando:
  ```bash
    npm run dev:create
  ```
  - buscar: Informar o prefixo da queue na função getQueue('SQS_NAME_QUEUE'), e rodar o comando:
  ```bash
    npm run dev:get
  ```
  - listar: chamar a função list() com o comando:
  ```bash
    npm run dev:list
  ```

## 2 - Serviço de envio e listagem de mensagens
 - envio: Informar a fila e o corpo da mensagem na função sendMessage('SQS_TEST_QUEUE', 'Hello world!');
 ```bash
  npm run dev:send
```
 - lista: Informar a fila na função receiveMessage('SQS_TEST_QUEUE') para listar todas as mensagens armazenas na fila, rodar o comando;
 ```bash
  npm run dev:receive
 ```


 ## A lista completa de comandos do @aws-sdk/client-sqs pode ser consultado em:
 
 - @aws-sdk/client-sqs -[https://docs.aws.amazon.com/AWSJavaScriptSDK/](v3/latest/clients/client-sqs/index.html)

## Stay in touch

- Author - [Jeferson Silva](https://github.com/silvajeferson82)
- linkedin - [/in/silvajeferson82](https://www.linkedin.com/in/silvajeferson82/)

## License

Nest is [MIT licensed](LICENSE).