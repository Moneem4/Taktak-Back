import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import { getMongoRepository } from 'typeorm'
import { ForbiddenError } from 'apollo-server-core'
import { Conversation, User } from '@models'
import { CreateConversationInput } from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { ChatMCS } from '../config/microservice/chat/chatMCS.service'

@Resolver('Conversation')
export class ConversationResolver {
	constructor(private readonly chatService: ChatMCS) {
		console.log('conversation.resolver')
	}

	@Query()
	async conversations() {
		const data = await this.chatService.send('getConversations', {})
		return data
	}

	@Query(() => Conversation)
	async conversationById(@Args('_id') _id: string): Promise<Conversation> {
		const data = await this.chatService.send('getConversationById', _id)

		return data
	}
	// -------------------------------------------------------------------------------------------------

	@Query(() => Conversation)
	async conversationsByUserId(@Args('userId') userId: string): Promise<Conversation> {
		console.log('im here')
		const data = await this.chatService.send('getConversationsByUserId',userId)		
		return data;
	}
	// -------------------------------------------------------------------------------------------------

	@Mutation(() => Conversation)
	async createConversation(
		@Args('input') input: CreateConversationInput
	): Promise<Conversation> {
		console.log('heeereee')
		const data = await this.chatService.send('createConversation', input)
		return data;
	}
	// -------------------------------------------------------------------------------------------------

	@Mutation(() => Boolean)
	async deleteConversation(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteConversation, input: ${_id}`)		
		const data = await this.chatService.send('deleteConversation', _id)
		return data;
	}
}
