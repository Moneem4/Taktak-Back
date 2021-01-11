import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateMenuInput,
	UpdateMenuInput,
	Menu
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('Menu')
export class MenuResolver {
	constructor(private readonly productService: ProductMCS) {
		console.log('Menu.resolver')
	}

	@Query()
	async getMenus() {
		const data = await this.productService.send('getMenus', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Menu)
	async getMenuById(@Args('_id') _id: string): Promise<Menu> {
		const data = await this.productService.send('getMenuById', _id)
<<<<<<< HEAD
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
=======
		console.log('data: ', data)
		console.log(`id : ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		if (data == null) {
			throw new ApolloError('Menu déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Menu)
	async createMenu(@Args('input') input: CreateMenuInput): Promise<Menu> {
<<<<<<< HEAD
		// Logger.log(`function:createMenu`);
		Logger.log(input)
		const data = await this.productService.send('createMenu', input)
		Logger.log(`function:createMenu, res: ${data}`)
=======
		// console.log(`function:createMenu`);
		console.log(input)
		const data = await this.productService.send('createMenu', input)
		console.log(`function:createMenu, res: ${data}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Menu)
	async updateMenu(
		@Args('_id') _id: string,
		@Args('input') input: UpdateMenuInput
	): Promise<Menu> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateMenu', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteMenu(@Args('_id') _id: string): Promise<boolean> {
<<<<<<< HEAD
		Logger.log(`function:deleteMenu, input: ${_id}`)
=======
		console.log(`function:deleteMenu, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.productService.send('deleteMenu', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
