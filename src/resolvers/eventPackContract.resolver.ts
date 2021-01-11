import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreateEventPackContractInput,
	UpdateEventPackContractInput,
	EventPackContract
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ContractMCS } from '../config/microservice/contract/contractMCS.service'
@Resolver('EventPackContractContract')
export class EventPackContractContractResolver {
	constructor(private readonly ContractService: ContractMCS) {
		console.log('eventPackContract.resolver')
	}

	@Query()
	async getEventPackContracts() {
		// Logger.log(`function:getEventPackContractComment, input: ${EventPackContractId}`);
		const data = await this.ContractService.send('getEventPackContracts', {})
		// Logger.log(data);
		return data
	}
	// to check {Access null ...}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => EventPackContract)
	async getEventPackContractById(
		@Args('_id') _id: string
	): Promise<EventPackContract> {
		const data = await this.ContractService.send(
			'getEventPackContractById',
			_id
		)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		return data
	}
	@Query()
	async getEventPackContractsByEvent(
		@Args('eventId') eventId: string
	): Promise<EventPackContract> {
		const data = await this.ContractService.send(
			'getEventPackContractsByEvent',
			eventId
		)
		Logger.log('data: ', data)
		Logger.log(`id : ${eventId}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventPackContract)
	async createEventPackContract(
		@Args('input') input: CreateEventPackContractInput
	): Promise<EventPackContract> {
		// Logger.log(`function:createEventPackContract`);
		Logger.log(input)
		const data = await this.ContractService.send(
			'createEventPackContract',
			input
		)
		Logger.log(`function:createEventPackContract, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => EventPackContract)
	async updateEventPackContract(
		@Args('_id') _id: string,
		@Args('input') input: UpdateEventPackContractInput
	): Promise<EventPackContract> {
		const messageData = { _id, ...input }
		const data = await this.ContractService.send(
			'updateEventPackContract',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteEventPackContract(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteEventPackContract, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.ContractService.send('deleteEventPackContract', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	/*  @Mutation()
    async deleteUserEventPackContracts(@Args('userId')userId: String): Promise<boolean> {
        const data = await this.ContractService.send('deleteUserEventPackContracts', userId);
        return data
    } */
}
