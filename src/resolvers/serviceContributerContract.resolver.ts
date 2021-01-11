import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreateServiceContributerInput,
	UpdateServiceContributerContractInput,
	ServiceContributerContract
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { ApolloError } from 'apollo-server-express'
import { ContractMCS } from '../config/microservice/contract/contractMCS.service'
@Resolver('ServiceContributerContract')
export class ServiceContributerResolver {
	constructor(private readonly ContractService: ContractMCS) {
		console.log('serviceContributerContract.resolver')
	}

	@Query()
	async getServiceContributersContracts() {
		//Logger.log(`function:getServiceContributerComment, input: ${ServiceContributerId}`);
		const data = await this.ContractService.send('getServiceContributers', {})
		//Logger.log(data);
		return data
	}
	//to check {Access null ...}
	//-------------------------------------------------------------------------------------------------------- finished

	@Query(() => ServiceContributerContract)
	async getServiceContributerContractById(
		@Args('_id') _id: string
	): Promise<ServiceContributerContract> {
		const data = await this.ContractService.send(
			'getServiceContributerById',
			_id
		)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		if (data == null) {
			Logger.log(`data vide:`)
			throw new ApolloError('getServiceContributerById déja supprimé +++++')
		} else return data
	}

	//----------------------------------------------------------------------------------------------- finished
	@Query()
	async getServiceContributerByContract(
		@Args('contractId') contractId: string
	) {
		const data = await this.ContractService.send(
			'getServiceContributerByContract',
			contractId
		)
		Logger.log('data: ', data)
		Logger.log(`id : ${contractId}`)

		return data
	}
	@Mutation(() => ServiceContributerContract)
	async CreateServiceContributerContract(
		@Args('input') input: CreateServiceContributerInput
	): Promise<ServiceContributerContract> {
		//Logger.log(`function:createServiceContributer`);
		Logger.log(input)
		const data = await this.ContractService.send(
			'CreateServiceContributerContract',
			input
		)
		Logger.log(`function:CreateServiceContributer, res: ${data}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => ServiceContributerContract)
	async updateServiceContributerContract(
		@Args('_id') _id: string,
		@Args('input') input: UpdateServiceContributerContractInput
	): Promise<ServiceContributerContract> {
		const messageData = { _id, ...input }
		const data = await this.ContractService.send(
			'updateServiceContributer',
			messageData
		)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteServiceContributerContract(
		@Args('_id') _id: String
	): Promise<boolean> {
		Logger.log(`function:deleteServiceContributer, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.ContractService.send(
			'deleteServiceContributer',
			_id
		)
		console.log('++++++', data)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation()
	async deleteServiceContributerByContract(
		@Args('contractId') contractId: String
	): Promise<boolean> {
		const data = await this.ContractService.send(
			'deleteServiceContributerByContract',
			contractId
		)
		return data
	}
}
