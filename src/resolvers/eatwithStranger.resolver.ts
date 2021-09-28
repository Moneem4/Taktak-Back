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
		@Args('_id') _id: string
	): Promise<EatWithStranger> {
		const data = await this.servicesService.send('getEatwithStrangerById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
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
		// console.log(`function:createEatwithStranger`);
		console.log(input)
		const data = await this.servicesService.send('createEatWithStranger', input)
		console.log(`function:createEatwithStranger, res: ${data}`)
		if(data==null)
		{	throw new ApolloError('verifier le service de cet entité,peut etre n exisete pas')}
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EatWithStranger)
	async updateEatwithStranger(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEatWithStrangerInput
	): Promise<EatWithStranger> {
		console.log(_id);
		const messageData = { _id, ...input }
		const data = await this.servicesService.send(
			'updateEatWithStranger',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEatwithStranger(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteEatwithStranger, input: ${_id}`)
	
		const data = await this.servicesService.send('deleteEatwithStranger', _id)
		if(data==null)
		{	throw new ApolloError('entity already deleted')}
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
