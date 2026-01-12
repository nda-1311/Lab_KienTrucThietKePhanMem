const amqp = require('amqplib');
const readline = require('readline');

// Kết nối đến RabbitMQ
async function startChat() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queueA = 'queue_A'; // Queue để Service 1 gửi message
  const queueB = 'queue_B'; // Queue để Service 1 nhận phản hồi

  // Tạo queue nếu chưa có
  await channel.assertQueue(queueA, { durable: false });
  await channel.assertQueue(queueB, { durable: false });

  console.log('Service 1 started. Type your message to chat.');

  // Gửi message vào queue_A
  const sendMessage = async (msg) => {
    channel.sendToQueue(queueA, Buffer.from(msg));
    console.log("Service 1 sent: " + msg);
  };

  // Đọc đầu vào từ người dùng
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', async (input) => {
    await sendMessage(input);

    // Đảm bảo không xác nhận tin nhắn test
    // Lắng nghe phản hồi từ queue_B (nhận tin từ Service 2)
    channel.consume(queueB, (msg) => {
      console.log('Service 1 received: ' + msg.content.toString());
      rl.prompt();
    }, { noAck: true }); // Đảm bảo không xác nhận tin nhắn test
  });

}

startChat().catch(console.error);
