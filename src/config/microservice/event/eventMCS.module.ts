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
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakEvents'],
					queue: 'taktakEvents',
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
