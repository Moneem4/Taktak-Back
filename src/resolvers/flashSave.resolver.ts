import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateFlashSaveInput,
	UpdateFlashSaveInput,
	FlashSave
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

	@Query(() => FlashSave)
	async getFlashSaveById(@Args('_id') _id: string): Promise<FlashSave> {
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

	@Mutation(() => FlashSave)
	async createFlashSave(
		@Args('input') input: CreateFlashSaveInput
	): Promise<FlashSave> {
		// console.log(`function:createFlashSave`);
		console.log(input)
		const data = await this.servicesService.send('createFlashSave', input)
		console.log(`function:createFlashSave, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => FlashSave)
	async updateFlashSave(
		@Args('_id') _id: string,
		@Args('input') input: UpdateFlashSaveInput
	): Promise<FlashSave> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send('updateFlashSave', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteFlashSave(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteFlashSave, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.servicesService.send('deleteFlashSave', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
