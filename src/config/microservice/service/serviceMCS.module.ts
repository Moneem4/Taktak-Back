import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ServiceMCS } from './serviceMCS.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'SERVICES_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_SERVICE_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_SERVICE_QUEUE}`,
					noAck: false,
					queueOptions: {
						durable: true
					}
				}
			}
		])
	],
	controllers: [],
	providers: [ServiceMCS],
	exports: [ServiceMCS]
})
export class ServiceModule {}
