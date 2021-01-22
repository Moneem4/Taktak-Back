import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'

import {
	CreateServiceInput,
	User,
	UpdateServiceInput,
	Service
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ServiceMCS } from '../config/microservice/service/serviceMCS.service'
import { ApolloError } from 'apollo-server'
@Resolver('Services')
export class ServicesResolver {
	constructor(private readonly servicesService: ServiceMCS) {
		console.log('service.resolver')
	}

	@Query()
	async getServices() {
		const data = await this.servicesService.send('getServices', {})
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Service)
	async getServiceById(@Args('_id') _id: string): Promise<Service> {
		const data = await this.servicesService.send('getServiceById', _id)
		if(data==null)
		{	throw new ApolloError('service already deleted')}
	
		return data
	}

	@Query(() => Service)
	async getServicesByUserId(@Args('userId') userId: string): Promise<Service> {
		const data = await this.servicesService.send('getServicesByUserId', userId)

		Logger.log('data: ', data)
		Logger.log(`id : ${userId}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Service)
	async createService(
		@Args('input') input: CreateServiceInput
	): Promise<Service> {
		Logger.log(input)
		const data = await this.servicesService.send('createService', input)

		Logger.log(`function:createService, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Service)
	async updateService(
		@Args('_id') _id: string,
		@Args('input') input: UpdateServiceInput
	): Promise<Service> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send('updateService', messageData)

		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteService(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteService, input: ${_id}`)
		const data = await this.servicesService.send('deleteService', _id)
		if(data==null)
		{	throw new ApolloError('service already deleted')}
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
