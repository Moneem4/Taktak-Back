import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ProductMCS } from './productMCS.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'PRODUCT-SERVICE',
				transport: Transport.RMQ,
				options: {
<<<<<<< HEAD
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakProduct'],
					queue: 'taktakProduct',
=======
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_PRODUCT_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_PRODUCT_QUEUE}`,
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
					noAck: true,
					queueOptions: {
						durable: true
					}
				}
			}
		])
	],
	controllers: [],
	providers: [ProductMCS],
	exports: [ProductMCS]
})
<<<<<<< HEAD
export class PostModule {}
=======
export class ProductModule {}
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
