import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'

import {
	CreateServiceContributorInput,
	User,
	UpdateServiceContributorInput,
	ServiceContributor
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ServiceMCS } from '../config/microservice/service/serviceMCS.service'
@Resolver('ServiceContributor')
export class ServiceContributorResolver {
	constructor(private readonly servicesService: ServiceMCS) {
		console.log('serviceContributor.resolver')
	}

	@Query()
	async contributors() {
		const data = await this.servicesService.send('getServiceContributors', {})

		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Mutation(() => ServiceContributor)
	async createServiceContributor(
		@Args('input') input: CreateServiceContributorInput
	): Promise<ServiceContributor> {
		console.log(input)
		const data = await this.servicesService.send(
			'createServiceContributor',
			input
		)

		console.log(`function:createServiceContributor, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => ServiceContributor)
	async updateServiceContributor(
		@Args('_id') _id: string,
		@Args('input') input: UpdateServiceContributorInput
	): Promise<ServiceContributor> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send(
			'updateServiceContributors',
			messageData
		)

		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteServiceContributor(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteServiceContributor, input: ${_id}`)
		const data = await this.servicesService.send(
			'deleteServiceContributor',
			_id
		)

		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
