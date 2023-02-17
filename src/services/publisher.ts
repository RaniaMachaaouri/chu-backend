import client, { Channel, Connection } from "amqplib";

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const publisher = async (queueName: string) => {
  const connection: Connection = await client.connect(
    "amqp://rania:rania@localhost:5672"
  );
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  setInterval(() => {
    const room = getRandomIntInclusive(1, 2);
    const temperature = getRandomIntInclusive(15, 20);

    channel.sendToQueue(queueName, Buffer.from(`${room}:${temperature}`));
  }, 3000);
};
