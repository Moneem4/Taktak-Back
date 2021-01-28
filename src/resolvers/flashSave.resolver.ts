import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateFlashSaleInput,
	UpdateFlashSaleInput,
	FlashSale
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ServiceMCS } from 'config/microservice/service/serviceMCS.service'

@Resolver('FlashSave')
export class FlashSaveResolver {
	constructor(private readonly servicesService: ServiceMCS) {
		console.log('FlashSave.resolver')
	}

	@Query()
	async getFlashSaves() {
		const data = await this.servicesService.send('getFlashSaves', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => FlashSale)
	async getFlashSaveById(@Args('_id') _id: string): Promise<FlashSale> {
		const data = await this.servicesService.send('getFlashSaveById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('FlashSave déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => FlashSale)
	async createFlashSave(
		@Args('input') input: CreateFlashSaleInput
	): Promise<FlashSale> {
		// console.log(`function:createFlashSave`);
		console.log(input)
		const data = await this.servicesService.send('createFlashSave', input)
		console.log(`function:createFlashSave, res: ${data}`)
		if(data==null)
		{	throw new ApolloError('verifier le service de flashsave,peut etre n exisete pas')}
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => FlashSale)
	async updateFlashSave(
		@Args('_id') _id: string,
		@Args('input') input: UpdateFlashSaleInput
	): Promise<FlashSale> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send('updateFlashSave', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteFlashSave(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteFlashSave, input: ${_id}`)
		
		const data = await this.servicesService.send('deleteFlashSave', _id)
		if(data==false)
		{	throw new ApolloError('entity already deleted')}
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
