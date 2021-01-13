import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateEatWithStrangerInput,
	UpdateEatWithStrangerInput,
	EatWithStranger
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ServiceMCS } from 'config/microservice/service/serviceMCS.service'

@Resolver('EatWithStranger')
export class EatWithStrangerResolver {
	constructor(private readonly servicesService: ServiceMCS) {
		console.log('EatWithStranger.resolver')
	}

	@Query()
	async getEatWithStrangers() {
		const data = await this.servicesService.send('getEatWithStrangers', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => EatWithStranger)
	async getEatWithStrangerById(
<<<<<<< HEAD
		@Args('_id') _id: String
	): Promise<EatWithStranger> {
		const data = await this.servicesService.send('getEatwithStrangerById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
=======
		@Args('_id') _id: string
	): Promise<EatWithStranger> {
		const data = await this.servicesService.send('getEatwithStrangerById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		if (data == null) {
			throw new ApolloError('Eat with Stranger déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EatWithStranger)
	async createEatwithStranger(
		@Args('input') input: CreateEatWithStrangerInput
	): Promise<EatWithStranger> {
<<<<<<< HEAD
		// Logger.log(`function:createEatwithStranger`);
		Logger.log(input)
		const data = await this.servicesService.send('createEatwithStranger', input)
		Logger.log(`function:createEatwithStranger, res: ${data}`)
=======
		// console.log(`function:createEatwithStranger`);
		console.log(input)
		const data = await this.servicesService.send('createEatwithStranger', input)
		console.log(`function:createEatwithStranger, res: ${data}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EatWithStranger)
	async updateEatwithStranger(
<<<<<<< HEAD
		@Args('_id') _id: String,
=======
		@Args('_id') _id: string,
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		@Args('input') input: UpdateEatWithStrangerInput
	): Promise<EatWithStranger> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send(
			'updateEatwithStranger',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
<<<<<<< HEAD
	async deleteEatwithStranger(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteEatwithStranger, input: ${_id}`)
=======
	async deleteEatwithStranger(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteEatwithStranger, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.servicesService.send('deleteEatwithStranger', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
