<<<<<<< HEAD
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
=======
/* import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
import {
	CreateTaskInput,
	UpdateTaskInput,
	Task
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
<<<<<<< HEAD

import { ClientProxy } from '@nestjs/microservices'
=======
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
import { EventMCS } from '../config/microservice/event/eventMCS.service'
@Resolver('Task')
export class TaskResolver {
	constructor(private readonly EventService: EventMCS) {
		console.log('task.resolver')
	}

	@Query()
	async getTasks() {
<<<<<<< HEAD
		//Logger.log(`function:getTaskComment, input: ${TaskId}`);
		const data = await this.EventService.send('getTasks', {})
		//Logger.log(data);
		return data
	}
	//to check {Access null ...}
	//-------------------------------------------------------------------------------------------------------- finished
=======
		// console.log(`function:getTaskComment, input: ${TaskId}`);
		const data = await this.EventService.send('getTasks', {})
		// console.log(data);
		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c

	@Query(() => Task)
	async getTaskById(@Args('_id') _id: string): Promise<Task> {
		const data = await this.EventService.send('getTaskById', _id)
<<<<<<< HEAD
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Task)
	async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
		//Logger.log(`function:createTask`);
		Logger.log(input)
		const data = await this.EventService.send('createTask', input)
		Logger.log(`function:createTask, res: ${data}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished
=======
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Task)
	async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
		// console.log(`function:createTask`);
		console.log(input)
		const data = await this.EventService.send('createTask', input)
		console.log(`function:createTask, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c

	@Mutation(() => Task)
	async updateTask(
		@Args('_id') _id: string,
		@Args('input') input: UpdateTaskInput
	): Promise<Task> {
		const messageData = { _id, ...input }
		const data = await this.EventService.send('updateTask', messageData)
		return data
	}
<<<<<<< HEAD
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteTasks(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteTask, input: ${_id}`)
=======
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteTasks(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteTask, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.EventService.send('deleteTask', _id)
		console.log('++++++', data)
		return data
	}
<<<<<<< HEAD
	//----------------------------------------------------------------------------------------------- finished
}
=======
	// ----------------------------------------------------------------------------------------------- finished
}
 */
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
