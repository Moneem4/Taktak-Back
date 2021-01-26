import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { EventMCS } from './eventMCS.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'EVENT-SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_EVENT_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_EVENT_QUEUE}`,
					noAck: false,
					queueOptions: {
						durable: true
					}
				}
			}
		])
	],
	controllers: [],
	providers: [EventMCS],
	exports: [EventMCS]
})
export class EventModule {}
