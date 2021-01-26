import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { ChatMCS } from './chatMCS.service'

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'CHAT-SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://taktak:taktak@127.0.0.1:5672/taktakChat'],
					queue: 'taktakChat',
					noAck: true,
					queueOptions: {
						durable: true
					}
				}
			}
		])
	],
	controllers: [],
	providers: [ChatMCS],
	exports: [ChatMCS]
})
export class ChatModule {}
