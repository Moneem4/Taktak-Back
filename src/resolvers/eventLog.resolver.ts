import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreateEventLogInput,
	UpdateEventLogInput,
	EventLog
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'

import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('EventLog')
export class EventLogResolver {
	constructor(private readonly eventService: EventMCS) {
		console.log('eventLog.resolver')
	}

	@Query()
	async getEventLogs() {
		const data = await this.eventService.send('getEventLogs', {})

		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => EventLog)
	async getEventLogById(@Args('_id') _id: string): Promise<EventLog> {
		const data = await this.eventService.send('getEventLogById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventLog)
	async createEventLog(
		@Args('input') input: CreateEventLogInput
	): Promise<EventLog> {
		// Logger.log(`function:createEventLog`);
		Logger.log(input)
		const data = await this.eventService.send('createEventLog', input)
		Logger.log(`function:createEventLog, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventLog)
	async updateEventLog(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventLogInput
	): Promise<EventLog> {
		const messageData = { _id, ...input }
		const data = await this.eventService.send('updateEventLog', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEventLog(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteEventLog, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.eventService.send('deleteEventLog', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
