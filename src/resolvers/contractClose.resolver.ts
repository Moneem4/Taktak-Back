/* import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreateContractCloseInput,
	UpdateContractCloseInput,
	ContractClose
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { ApolloError } from 'apollo-server-express'
import { ContractMCS } from '../config/microservice/contract/contractMCS.service'
@Resolver('ContractClose')
export class ContractCloseResolver {
	constructor(private readonly contractService: ContractMCS) {
		console.log('contractClose.resolver')
	}

	@Query()
	async getContractCloses() {
		const data = await this.contractService.send('getContractCloses', {})

		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => ContractClose)
	async getContractCloseById(@Args('_id') _id: string): Promise<ContractClose> {
		const data = await this.contractService.send('getContractCloseById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			console.log(`data vide:`)
			throw new ApolloError('ContractClose déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished
	@Query()
	async getContractCloseByContract(@Args('contractId') contractId: string) {
		const data = await this.contractService.send(
			'getContractCloseByContract',
			contractId
		)
		console.log('data: ', data)
		console.log(`id : ${contractId}`)

		return data
	}
	@Mutation(() => ContractClose)
	async createContractClose(
		@Args('input') input: CreateContractCloseInput
	): Promise<ContractClose> {
		// console.log(`function:createContractClose`);
		console.log(input)
		const data = await this.contractService.send('CreateContractClose', input)
		console.log(`function:CreateContractClose, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => ContractClose)
	async updateContractClose(
		@Args('_id') _id: string,
		@Args('input') input: UpdateContractCloseInput
	): Promise<ContractClose> {
		const messageData = { _id, ...input }
		const data = await this.contractService.send(
			'updateContractClose',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteContractClose(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteContractClose, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.contractService.send('deleteContractClose', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
 */
