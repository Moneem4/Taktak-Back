import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { PostMCS } from './postMCS.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'POST-SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_POST_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_POST_QUEUE}`,
					noAck: false,
					queueOptions: {
						durable: true
					}
				}
			}
		])
	],
	controllers: [],
	providers: [PostMCS],
	exports: [PostMCS]
})
export class PostModule {}
