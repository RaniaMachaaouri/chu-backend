import client, { Channel, Connection, ConsumeMessage } from "amqplib";
import { MemCahche } from "./memcache";

/*const message = (channel: Channel) => (msg: ConsumeMessage | null): void => {
    if (msg) {
      console.log("Message received ", msg.content.toString())
      channel.ack(msg)
    }
}*/
export const consumer = async (queueName: string) => {
  const connection: Connection = await client.connect(
    "amqp://rania:rania@localhost:5672"
  );
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  await channel.consume(queueName, (msg: client.ConsumeMessage | null) => {
    if (msg) {
      const message = msg.content.toString().split(":");
      const room = message[0];
      const temperature = message[1];
      channel.ack(msg);
      console.log(`Room:${room} - temperature:${temperature}`);

      const client = MemCahche.getInstance().hasUser(room);
      if (client) {
        console.log(
          `Room:${room} - temperature:${temperature} - Client:${client}`
        );
      }
    }
  });
};
