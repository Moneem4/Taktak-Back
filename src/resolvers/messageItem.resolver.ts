import {
	Resolver,
	Mutation,
	Args,
	Query,
	Context,
	Subscription
} from '@nestjs/graphql'
import { MessageItem } from '../models'
import { CreateMessageItemInput } from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ChatMCS } from '../config/microservice/chat/chatMCS.service'

@Resolver('MessageItem')
export class MessageItemResolver {
	constructor(private readonly chatService: ChatMCS) {
		console.log('messageItem.resolver')
	}

	@Query()
	async messageItem(@Args('messageId') messageId: string) {
		// Logger.log(`function:getMbPostAccesses, input: ${mbPostId}`);
		const data = await this.chatService.send('getMessageItems', messageId)

		// Logger.log(data);
		return data
	}
	// to verify

	@Query(() => MessageItem)
	async messageItemById(@Args('_id') _id: string): Promise<MessageItem> {
		const data = await this.chatService.send('getMessageItemById', _id)

		Logger.log(`id : ${_id}`)
		return data
	}
	// ok

	@Mutation(() => MessageItem)
	async createMessageItem(
		@Args('input') input: CreateMessageItemInput
	): Promise<MessageItem> {
		Logger.log(input)
		const data = await this.chatService.send('createMessageItem', input)

		console.log(`function:createMessageItem, res: `, data)
		return data
	}
	// ok

	@Mutation(() => Boolean)
	async deleteMessageItem(@Args('_id') _id: String): Promise<boolean> {
		const data = await this.chatService.send('deleteMessageItem', _id)

		return data
	}
	// ok
}
