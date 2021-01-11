import {
	Resolver,
	Mutation,
	Args,
	Query,
	Context,
	Subscription
} from '@nestjs/graphql'

import { Message } from '../models'
import { CreateMessageInput } from '../generator/graphql.schema'
import { MESSAGES_SUBSCRIPTION } from '../environments'
import { Logger } from '@nestjs/common'

import { ChatMCS } from '../config/microservice/chat/chatMCS.service'

@Resolver('Message')
export class MessageResolver {
	constructor(private readonly chatService: ChatMCS) {
		console.log('message.resolver')
	}

	@Query(() => Message)
	async messages(@Args('conversationId') conversationId: string) {
		console.log(`conversationID: ${conversationId}`)
		const data = await this.chatService.send('getMessages', conversationId)

		return data
	}
	// not ok

	@Mutation(() => Message)
	async sendMessage(
		@Args('input') input: CreateMessageInput
	): Promise<Message> {
		const data = await this.chatService.send('sendMessage', input)
		return data
	}

	@Mutation(() => Boolean)
	async deleteMessage(@Args('_id') _id: String): Promise<boolean> {
<<<<<<< HEAD
		Logger.log(`function:deleteMessage, input: ${_id}`)
=======
		console.log(`function:deleteMessage, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.chatService.send('deleteMessage', _id)
		return data
	}

	@Subscription(() => Object, {
		filter: (payload: any, variables: any, context: any) => {
			const { userIds } = payload
			const { _id } = context.currentUser
			return userIds.indexOf(_id) > -1
		}
	})
	async newMessages(@Context('pubsub') pubsub: any): Promise<Notification> {
		return pubsub.asyncIterator(MESSAGES_SUBSCRIPTION)
	}
}
