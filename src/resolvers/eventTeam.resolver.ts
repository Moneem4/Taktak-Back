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
		Logger.log('data: ', data)
		Logger.log(`id : ${eventId}`)
		return data
	}

	@Query(() => EventTeam)
	async getEventTeamById(@Args('_id') _id: string): Promise<EventTeam> {
		const data = await this.eventService.send('getEventTeamById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		return data
	}
	/* @Query()
    async getEventTeamsByEvent(@Args('eventId') eventId: string): Promise<EventTeam> {
        const data = await this.eventService.send( 'getEventTeamsByEvent', eventId);
        Logger.log("data: ",data);
        Logger.log(`id : ${eventId}`);
        return data;
    }    */
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventTeam)
	async createEventTeam(
		@Args('input') input: CreateEventTeamInput
	): Promise<EventTeam> {
		// Logger.log(`function:createEventTeam`);
		Logger.log(input)
		const data = await this.eventService.send('createEventTeam', input)
		Logger.log(`function:createEventTeam, res: ${data}`)
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
		Logger.log(`function:deleteEventTeam, input: ${_id}`)
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
