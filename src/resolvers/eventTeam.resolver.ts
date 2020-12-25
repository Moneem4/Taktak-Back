import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateEventTeamInput,
	UpdateEventTeamInput,
	EventTeam
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('EventTeam')
export class EventTeamResolver {
	constructor(private readonly eventService: EventMCS) {
		console.log('eventTeam.resolver')
	}

	@Query()
	async getEventTeams() {
		const data = await this.eventService.send('getEventTeams', {})
		return data
	}
	@Query()
	async eventTeamsByEvent(
		@Args('eventId') eventId: string
	): Promise<EventTeam> {
		const data = await this.eventService.send('getEventTeamById', eventId)
		console.log('data: ', data)
		console.log(`id : ${eventId}`)
		return data
	}

	@Query(() => EventTeam)
	async getEventTeamById(@Args('_id') _id: string): Promise<EventTeam> {
		const data = await this.eventService.send('getEventTeamById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data
	}
	/* @Query()
    async getEventTeamsByEvent(@Args('eventId') eventId: string): Promise<EventTeam> {
        const data = await this.eventService.send( 'getEventTeamsByEvent', eventId);
        console.log("data: ",data);
        console.log(`id : ${eventId}`);
        return data;
    }    */
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventTeam)
	async createEventTeam(
		@Args('input') input: CreateEventTeamInput
	): Promise<EventTeam> {
		// console.log(`function:createEventTeam`);
		console.log(input)
		const data = await this.eventService.send('createEventTeam', input)
		console.log(`function:createEventTeam, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventTeam)
	async updateEventTeam(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventTeamInput
	): Promise<EventTeam> {
		const messageData = { _id, ...input }
		const data = await this.eventService.send('updateEventTeam', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEventTeam(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteEventTeam, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.eventService.send('deleteEventTeam', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	/*  @Mutation()
    async deleteUserEventTeams(@Args('userId')userId: String): Promise<boolean> {
        const data = await this.EventService.send('deleteUserEventTeams', userId);
        return data
    } */
}
