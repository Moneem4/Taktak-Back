import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateEventInput,
	UpdateEventInput,
	Event
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('Event')
export class EventResolver {
	constructor(private readonly EventService: EventMCS) {
		console.log('event.resolver')
	}

	@Query()
	async getEvents() {
		//console.log(`function:getEventComment, input: ${EventId}`);
		const data = await this.EventService.send('getEvents', {})
		//console.log(data);
		return data
	}
	//to check {Access null ...}
	//-------------------------------------------------------------------------------------------------------- finished

	@Query(() => Event)
	async getEventById(@Args('_id') _id: string): Promise<Event> {
		const data = await this.EventService.send('getEventById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			console.log(`data vide:`)
			throw new ApolloError('event déja supprimé +++++')
		} else return data
	}

	//----------------------------------------------------------------------------------------------- finished
	@Query()
	async getEventbyCreator(@Args('creatorId') creatorId: string) {
		const data = await this.EventService.send('getEventbyCreator', creatorId)
		console.log('data: ', data)
		console.log(`id : ${creatorId}`)

		return data
	}
	@Mutation(() => Event)
	async createEvent(@Args('input') input: CreateEventInput): Promise<Event> {
		//console.log(`function:createEvent`);
		console.log(input)
		const data = await this.EventService.send('createEvent', input)
		console.log(`function:createEvent, res: ${data}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Event)
	async updateEvent(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventInput
	): Promise<Event> {
		const messageData = { _id, ...input }
		const data = await this.EventService.send('updateEvent', messageData)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEvent(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteEvent, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.EventService.send('deleteEvent', _id)
		console.log('++++++', data)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation()
	async deleteCreatorEvents(
		@Args('creatorId') creatorId: String
	): Promise<boolean> {
		const data = await this.EventService.send('deleteUserEvents', creatorId)
		return data
	}
}
