import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateContractInput,
	UpdateContractInput,
	Contract
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ContractMCS } from '../config/microservice/contract/contractMCS.service'

@Resolver('Contract')
export class ContractResolver {
	constructor(private readonly contractService: ContractMCS) {
		console.log('contract.resolver')
	}

	@Query()
	async getContracts() {
		const data = await this.contractService.send('getContracts', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Contract)
	async getContractById(@Args('_id') _id: string): Promise<Contract> {
		const data = await this.contractService.send('getContractById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('Contract déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished
	@Query()
	async getContractByContractor(@Args('contractor') contractor: string) {
		const data = await this.contractService.send(
			'getContractByContractor',
			contractor
		)
		if (data == null) {
			throw new ApolloError('Contract déja supprimé +++++')
		} else {
			return data
		}
	}
	@Mutation(() => Contract)
	async createContract(
		@Args('input') input: CreateContractInput
	): Promise<Contract> {
		Logger.log(input)
		const data = await this.contractService.send('createContract', input)
		Logger.log(`function:createContract, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Contract)
	async updateContract(
		@Args('_id') _id: string,
		@Args('input') input: UpdateContractInput
	): Promise<Contract> {
		const messageData = { _id, ...input }
		const data = await this.contractService.send('updateContract', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteContract(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteContract, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.contractService.send('deleteContract', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation()
	async deleteContractorContracts(
		@Args('contractor') contractor: String
	): Promise<boolean> {
		const data = await this.contractService.send(
			'deleteContractorContracts',
			contractor
		)
		return data
	}
}
