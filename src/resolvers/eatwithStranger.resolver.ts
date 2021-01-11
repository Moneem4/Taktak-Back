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
		@Args('_id') _id: String
	): Promise<EatWithStranger> {
		const data = await this.servicesService.send('getEatwithStrangerById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
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
		// Logger.log(`function:createEatwithStranger`);
		Logger.log(input)
		const data = await this.servicesService.send('createEatwithStranger', input)
		Logger.log(`function:createEatwithStranger, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EatWithStranger)
	async updateEatwithStranger(
		@Args('_id') _id: String,
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
	async deleteEatwithStranger(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteEatwithStranger, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.servicesService.send('deleteEatwithStranger', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
