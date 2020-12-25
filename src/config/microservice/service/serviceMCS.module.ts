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
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakService'],
					queue: 'taktakServices',
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
