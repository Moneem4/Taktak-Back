import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateFlashSaleInput,
	UpdateFlashSaleInput,
	FlashSale
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ServiceMCS } from 'config/microservice/service/serviceMCS.service'

@Resolver('FlashSale')
export class FlashSaleResolver {
	constructor(private readonly servicesService: ServiceMCS) {
		console.log('FlashSale.resolver')
	}

	@Query()
	async getFlashSales() {
		const data = await this.servicesService.send('getFlashSales', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => FlashSale)
	async getFlashSaleById(@Args('_id') _id: string): Promise<FlashSale> {
		const data = await this.servicesService.send('getFlashSaleById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('FlashSale déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => FlashSale)
	async createFlashSale(
		@Args('input') input: CreateFlashSaleInput
	): Promise<FlashSale> {
		// console.log(`function:createFlashSale`);
		console.log(input)
		const data = await this.servicesService.send('createFlashSale', input)
		console.log(`function:createFlashSale, res: ${data}`)
		if(data==null)
		{	throw new ApolloError('verifier le service de FlashSale,peut etre n exisete pas')}
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => FlashSale)
	async updateFlashSale(
		@Args('_id') _id: string,
		@Args('input') input: UpdateFlashSaleInput
	): Promise<FlashSale> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send('updateFlashSale', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteFlashSale(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteFlashSale, input: ${_id}`)
		
		const data = await this.servicesService.send('deleteFlashSale', _id)
		if(data==false)
		{	throw new ApolloError('entity already deleted')}
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
