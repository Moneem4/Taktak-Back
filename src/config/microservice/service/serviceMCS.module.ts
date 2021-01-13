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
<<<<<<< HEAD
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakServices'],
					queue: 'taktakServices',
					noAck: false,
=======
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_SERVICE_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_SERVICE_QUEUE}`,
					noAck: true,
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
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
