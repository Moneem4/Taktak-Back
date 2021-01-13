import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateWastedFoodInput,
	UpdateWastedFoodInput,
	WastedFood
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ServiceMCS } from 'config/microservice/service/serviceMCS.service'

@Resolver('WastedFood')
export class WastedFoodResolver {
	constructor(private readonly servicesService: ServiceMCS) {
		console.log('WastedFood.resolver')
	}

	@Query()
	async getWastedFoods() {
		const data = await this.servicesService.send('getWastedFoods', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => WastedFood)
	async getWastedFoodById(@Args('_id') _id: string): Promise<WastedFood> {
		const data = await this.servicesService.send('getWastedFoodById', _id)
<<<<<<< HEAD
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
=======
		console.log('data: ', data)
		console.log(`id : ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		if (data == null) {
			throw new ApolloError('WastedFood déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => WastedFood)
	async createWastedFood(
		@Args('input') input: CreateWastedFoodInput
	): Promise<WastedFood> {
<<<<<<< HEAD
		// Logger.log(`function:createWastedFood`);
		Logger.log(input)
		const data = await this.servicesService.send('createWastedFood', input)
		Logger.log(`function:createWastedFood, res: ${data}`)
=======
		// console.log(`function:createWastedFood`);
		console.log(input)
		const data = await this.servicesService.send('createWastedFood', input)
		console.log(`function:createWastedFood, res: ${data}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => WastedFood)
	async updateWastedFood(
		@Args('_id') _id: string,
		@Args('input') input: UpdateWastedFoodInput
	): Promise<WastedFood> {
		const messageData = { _id, ...input }
		const data = await this.servicesService.send(
			'updateWastedFood',
			messageData
		)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteWastedFood(@Args('_id') _id: string): Promise<boolean> {
<<<<<<< HEAD
		Logger.log(`function:deleteWastedFood, input: ${_id}`)
=======
		console.log(`function:deleteWastedFood, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.servicesService.send('deleteWastedFood', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
