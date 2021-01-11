import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'

import {
	CreateServicePackInput,
	User,
	UpdateServicePackInput,
	ServicePack
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ServiceMCS } from '../config/microservice/service/serviceMCS.service'
@Resolver('ServicePacks')
export class ServicePacksResolver {
	constructor(private readonly servicesService: ServiceMCS) {
		console.log('servicePack.resolver')
	}

	@Query()
	async servicePacks() {
		const data = await this.servicesService.send('getServicePacks', {})
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Mutation(() => ServicePack)
	async createService(
		@Args('input') input: CreateServicePackInput
	): Promise<ServicePack> {
		Logger.log(input)
		const data = await this.servicesService.send('createServicePack', input)
		Logger.log(`function:createServicePack, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => ServicePack)
	async updateServicePack(
		@Args('_id') _id: string,
		@Args('input') input: UpdateServicePackInput
	): Promise<ServicePack> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send(
			'updateServicePack',
			messageData
		)

		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteServicePack(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteServicePack, input: ${_id}`)
		const data = await this.servicesService.send('deleteServicePack', _id)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
