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
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_PRODUCT_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_PRODUCT_QUEUE}`,
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
export class ProductModule {}
