import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreateEventPackUserInput,
	UpdateEventPackUserInput,
	EventPackUser
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('EventPackUser')
export class EventPackUserResolver {
	constructor(private readonly eventService: EventMCS) {
		console.log('eventPackUser.resolver')
	}

	@Query()
	async getEventPackUsers() {
		// console.log(`function:getEventPackUserComment, input: ${EventPackUserId}`);
		const data = await this.eventService.send('getEventPackUsers', {})
		// console.log(data);
		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => EventPackUser)
	async getEventPackUserById(
		@Args('userId') userId: string
	): Promise<EventPackUser> {
		const data = await this.eventService.send('getEventPackUserById', userId)
		console.log('data: ', data)
		console.log(`id : ${userId}`)
		return data
	}
	/* @Query()
    async getEventPackUsersByEvent(@Args('eventId') eventId: string): Promise<EventPackUser> {
        const data = await this.eventService.send( 'getEventPackUsersByEvent', eventId);
        console.log("data: ",data);
        console.log(`id : ${eventId}`);
        return data;
    }    */
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventPackUser)
	async createEventPackUser(
		@Args('input') input: CreateEventPackUserInput
	): Promise<EventPackUser> {
		// console.log(`function:createEventPackUser`);
		console.log(input)
		const data = await this.eventService.send('createEventPackUser', input)
		console.log(`function:createEventPackUser, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventPackUser)
	async updateEventPackUser(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventPackUserInput
	): Promise<EventPackUser> {
		const messageData = { _id, ...input }
		const data = await this.eventService.send(
			'updateEventPackUser',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEventPackUser(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteEventPackUser, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.eventService.send('deleteEventPackUser', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	/*  @Mutation()
    async deleteUserEventPackUsers(@Args('userId')userId: string): Promise<boolean> {
        const data = await this.eventService.send('deleteUserEventPackUsers', userId);
        return data
    } */
}
