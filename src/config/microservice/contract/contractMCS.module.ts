import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ContractMCS } from './contractMCS.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'CONTRACT-SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakContract'],
					queue: 'taktakContract',
					noAck: false,
					queueOptions: {
						durable: true
					}
				}
			}
		])
	],
	controllers: [],
	providers: [ContractMCS],
	exports: [ContractMCS]
})
export class ContractModule {}
