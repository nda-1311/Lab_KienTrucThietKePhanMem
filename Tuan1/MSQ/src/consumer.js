const amqp = require('amqplib');

// Kết nối đến RabbitMQ
async function startChat() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queueA = 'queue_A'; 
  const queueB = 'queue_B'; 

  // Tạo queue nếu chưa có
  // Tạo queue nếu chưa có
  await channel.assertQueue(queueA, { durable: false });
  await channel.assertQueue(queueB, { durable: false });

  console.log('Service 2 waiting for messages...');

  // Nhận message từ queue_A
  channel.consume(queueA, (msg) => {
    const message = msg.content.toString();
    console.log('Service 2 received: ' + message);
    processEvent(message);

    const response = `Service 2 response: ${message}`;
    channel.sendToQueue(queueB, Buffer.from(response));
    console.log('Service 2 sent: ' + response);
  }, { noAck: true });
}

function processEvent(event) {
  console.log('Processing event: ' + event);
}

startChat().catch(console.error);
