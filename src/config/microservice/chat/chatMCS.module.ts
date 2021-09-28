import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ChatMCS } from './chatMCS.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'chat',
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_CHAT_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_CHAT_QUEUE}`,
					noAck: false,
					queueOptions: {
						durable: true
					}
				}
			}
		])
	],
	controllers: [],
	providers: [ChatMCS],
	exports: [ChatMCS]
})
export class ChatModule {}
