/* import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreateTaskInput,
	UpdateTaskInput,
	Task
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('Task')
export class TaskResolver {
	constructor(private readonly EventService: EventMCS) {
		console.log('task.resolver')
	}

	@Query()
	async getTasks() {
		// Logger.log(`function:getTaskComment, input: ${TaskId}`);
		const data = await this.EventService.send('getTasks', {})
		// Logger.log(data);
		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Task)
	async getTaskById(@Args('_id') _id: string): Promise<Task> {
		const data = await this.EventService.send('getTaskById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Task)
	async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
		// Logger.log(`function:createTask`);
		Logger.log(input)
		const data = await this.EventService.send('createTask', input)
		Logger.log(`function:createTask, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Task)
	async updateTask(
		@Args('_id') _id: string,
		@Args('input') input: UpdateTaskInput
	): Promise<Task> {
		const messageData = { _id, ...input }
		const data = await this.EventService.send('updateTask', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteTasks(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteTask, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.EventService.send('deleteTask', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
 */
