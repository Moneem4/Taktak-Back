import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreatePageAdminContractInput,
	UpdatePageAdminContractInput,
	PageAdminContract
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server-express'
import { ContractMCS } from '../config/microservice/contract/contractMCS.service'
@Resolver('PageAdminContract')
export class ServicePageAdminContractResolver {
	constructor(private readonly contractService: ContractMCS) {
		console.log('pageAdminContract.resolver')
	}

	@Query()
	async getPageAdminContracts() {
		// console.log(`function:getServicePageAdminContractComment, input: ${ServicePageAdminContractId}`);
		const data = await this.contractService.send(
			'getServicePageAdminContracts',
			{}
		)
		// console.log(data);
		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => PageAdminContract)
	async getPageAdminContractsById(
		@Args('_id') _id: string
	): Promise<PageAdminContract> {
		const data = await this.contractService.send(
			'getServicePageAdminContractById',
			_id
		)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			console.log(`data vide:`)
			throw new ApolloError(
				'getServicePageAdminContractById déja supprimé +++++'
			)
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished
	@Query()
	async getPageAdminContractByContract(@Args('contractId') contractId: string) {
		const data = await this.contractService.send(
			'getServicePageAdminContractByContract',
			contractId
		)
		console.log('data: ', data)
		console.log(`id : ${contractId}`)

		return data
	}
	@Mutation(() => PageAdminContract)
	async CreatePageAdminContract(
		@Args('input') input: CreatePageAdminContractInput
	): Promise<PageAdminContract> {
		// console.log(`function:createServicePageAdminContract`);
		console.log(input)
		const data = await this.contractService.send(
			'CreatePageAdminContract',
			input
		)
		console.log(`function:CreatePageAdminContract, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => PageAdminContract)
	async updatePageAdminContract(
		@Args('_id') _id: string,
		@Args('input') input: UpdatePageAdminContractInput
	): Promise<PageAdminContract> {
		const messageData = { _id, ...input }
		const data = await this.contractService.send(
			'updatePageAdminContract',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deletePageAdminContract(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deletePageAdminContract, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.contractService.send('deletePageAdminContract', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	/*  @Mutation()
    async deleteServicePageAdminContractByContract(@Args('contractId')contractId: string): Promise<boolean> {
        const data = await this.contractService.send('deletePageAdminContractByContract', contractId);
        return data
    } */
}
