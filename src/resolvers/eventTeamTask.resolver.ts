import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateEventTeamTasksInput,
	UpdateEventTeamTasksInput,
	EventTeamTasks
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('EventTeamTasks')
export class EventTeamTasksResolver {
	constructor(private readonly eventService: EventMCS) {
		console.log('eventTeamTask.resolver')
	}

	@Query()
	async getEventTeamTasks() {
		// console.log(`function:getEventTeamTasksComment, input: ${EventTeamTasksId}`);
		const data = await this.eventService.send('getEventTeamTasks', {})
		// console.log(data);
		return data
	}
	@Query()
	async getEventTeamTaskById(
		@Args('_id') _id: string
	): Promise<EventTeamTasks> {
		const data = await this.eventService.send('getEventTeamTaskById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventTeamTasks)
	async createEventTeamTasks(
		@Args('input') input: CreateEventTeamTasksInput
	): Promise<EventTeamTasks> {
		// console.log(`function:createEventTeamTasks`);
		console.log(input)
		const data = await this.eventService.send('createEventTeamTasks', input)
		console.log(`function:createEventTeamTasks, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventTeamTasks)
	async updateEventTeamTasks(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventTeamTasksInput
	): Promise<EventTeamTasks> {
		const messageData = { _id, ...input }
		const data = await this.eventService.send(
			'updateEventTeamTasks',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEventTeamTasks(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteEventTeamTasks, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.eventService.send('deleteEventTeamTasks', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
