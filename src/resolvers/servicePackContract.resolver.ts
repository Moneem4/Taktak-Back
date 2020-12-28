import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreateServicePackContractInput,
	UpdateServicePackContractInput,
	ServicePackContract
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'

import { ClientProxy } from '@nestjs/microservices'
import { ObjectId } from 'mongodb'
import { throwError } from 'rxjs'
import { ApolloError, UserInputError } from 'apollo-server-express'
import { ContractMCS } from '../config/microservice/contract/contractMCS.service'
@Resolver('ServicePackContract')
export class ServicePackContractResolver {
	constructor(private readonly ContractService: ContractMCS) {
		console.log('servicePackContract.resolver')
	}

	@Query()
	async getServicePackContracts() {
		//console.log(`function:getServicePackContractComment, input: ${ServicePackContractId}`);
		const data = await this.ContractService.send('getServicePackContracts', {})
		//console.log(data);
		return data
	}
	//to check {Access null ...}
	//-------------------------------------------------------------------------------------------------------- finished

	@Query(() => ServicePackContract)
	async getServicePackContractById(
		@Args('_id') _id: string
	): Promise<ServicePackContract> {
		const data = await this.ContractService.send(
			'getServicePackContractById',
			_id
		)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			console.log(`data vide:`)
			throw new ApolloError('getServicePackContractById déja supprimé +++++')
		} else return data
	}

	//----------------------------------------------------------------------------------------------- finished
	@Query()
	async getServicePackContractByContract(
		@Args('contractId') contractId: string
	) {
		const data = await this.ContractService.send(
			'getServicePackContractByContract',
			contractId
		)
		console.log('data: ', data)
		console.log(`id : ${contractId}`)

		return data
	}
	@Mutation(() => ServicePackContract)
	async createServicePackContract(
		@Args('input') input: CreateServicePackContractInput
	): Promise<ServicePackContract> {
		//console.log(`function:createServicePackContract`);
		console.log(input)
		const data = await this.ContractService.send(
			'CreateServicePackContract',
			input
		)
		console.log(`function:CreateServicePackContract, res: ${data}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => ServicePackContract)
	async updateServicePackContract(
		@Args('_id') _id: string,
		@Args('input') input: UpdateServicePackContractInput
	): Promise<ServicePackContract> {
		const messageData = { _id, ...input }
		const data = await this.ContractService.send(
			'updateServicePackContract',
			messageData
		)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteServicePackContract(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteServicePackContract, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.ContractService.send(
			'deleteServicePackContract',
			_id
		)
		console.log('++++++', data)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation()
	async deleteServicePackContractByContract(
		@Args('contractId') contractId: String
	): Promise<boolean> {
		const data = await this.ContractService.send(
			'deleteServicePackContractByContract',
			contractId
		)
		return data
	}
}
