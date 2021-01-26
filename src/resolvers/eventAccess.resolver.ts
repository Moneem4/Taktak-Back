import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateEventAccessInput,
	UpdateEventAccessInput,
	EventAccess
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('EventAccess')
export class EventAccessResolver {
	constructor(private readonly eventService: EventMCS) {
		console.log('eventAccess.resolver')
	}

	@Query()
	async getEventAccess() {
		// Logger.log(`function:getEventAccessComment, input: ${EventAccessId}`);
		const data = await this.eventService.send('getEventAccess', {})
		// Logger.log(data);
		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => EventAccess)
	async getEventAccessById(@Args('_id') _id: string): Promise<EventAccess> {
		const data = await this.eventService.send('getEventAccessById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventAccess)
	async createEventAccess(
		@Args('input') input: CreateEventAccessInput
	): Promise<EventAccess> {
		// Logger.log(`function:createEventAccess`);
		Logger.log(input)
		const data = await this.eventService.send('createEventAccess', input)
		return data
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventAccess)
	async updateEventAccess(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventAccessInput
	): Promise<EventAccess> {
		const messageData = { _id, ...input }
		const data = await this.eventService.send('updateEventAccess', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEventAccess(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteEventAccess, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.eventService.send('deleteEventAccess', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	/* @Mutation()
    async deleteUserEventAccesss(@Args('userId')userId: String): Promise<boolean> {
        const data = await this.eventService.send('deleteUserEventAccesss', userId);
        return data
    }
 */
}
