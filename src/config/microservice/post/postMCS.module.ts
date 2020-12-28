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
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakPosts'],
					queue: 'taktakPosts',
					noAck: true,
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
