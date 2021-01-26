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
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}/${process.env.RABBITMQ_MCS_CONTRACT_VHOST}`
					],
					queue: `${process.env.RABBITMQ_MCS_CONTRACT_QUEUE}`,
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
