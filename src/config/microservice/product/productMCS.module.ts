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
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakProduct'],
					queue: 'taktakProduct',
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
export class PostModule {}
