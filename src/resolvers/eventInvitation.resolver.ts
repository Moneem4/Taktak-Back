import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateEventInvitationInput,
	UpdateEventInvitationInput,
	EventInvitation
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('EventInvitation')
export class EventInvitationResolver {
	constructor(private readonly eventService: EventMCS) {
		console.log('eventInvitation.resolver')
	}

	@Query()
	async getEventInvitations() {
		const data = await this.eventService.send('getEventInvitations', {})

		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => EventInvitation)
	async getEventInvitationById(
		@Args('_id') _id: string
	): Promise<EventInvitation> {
		const data = await this.eventService.send('getEventInvitationById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data
	}
	@Query()
	async getEventInvitationEvent(
		@Args('eventId') eventId: string
	): Promise<EventInvitation> {
		const data = await this.eventService.send('getEventInvitationById', eventId)
		console.log('data: ', data)
		console.log(`id : ${eventId}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventInvitation)
	async createEventInvitation(
		@Args('input') input: CreateEventInvitationInput
	): Promise<EventInvitation> {
		// console.log(`function:createEventInvitation`);
		console.log(input)
		const data = await this.eventService.send('createEventInvitation', input)
		console.log(`function:createEventInvitation, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventInvitation)
	async updateEventInvitation(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventInvitationInput
	): Promise<EventInvitation> {
		const messageData = { _id, ...input }
		const data = await this.eventService.send(
			'updateEventInvitation',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEventInvitation(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteEventInvitation, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.eventService.send('deleteEventInvitation', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	/* @Mutation()
    async deleteUserEventInvitations(@Args('userId')userId: String): Promise<boolean> {
        const data = await this.eventService.send('deleteUserEventInvitations', userId);
        return data
    }
 */
}
