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
	async messageItems(@Args('messageId') messageId: string) {
		const data = await this.chatService.send('getMessageItems', messageId)
		return data;
	}
	

	@Query(() => MessageItem)
	async messageItemById(@Args('_id') _id: string): Promise<MessageItem> {
		const data = await this.chatService.send('getMessageItemById', _id)
		console.log(`id : ${_id}`)
		return data;
	}
	

	@Mutation(() => MessageItem)
	async createMessageItem(
		@Args('input') input: CreateMessageItemInput
	): Promise<MessageItem> {
		console.log(input)
		const data = await this.chatService.send('createMessageItem', input);
		console.log(`function:createMessageItem, res: `, data);
		return data;
	}
	

	@Mutation(() => Boolean)
	async deleteMessageItem(@Args('_id') _id: String): Promise<boolean> {
		const data = await this.chatService.send('deleteMessageItem', _id);
		return data;
	}	
}
