import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateCategoryInput,
	UpdateCategoryInput,
	Category
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('Category')
export class CategoryResolver {
<<<<<<< HEAD
	constructor(private readonly productService: ProductMCS) {
		console.log('Category.resolver')
	}
=======
	constructor(private readonly productService: ProductMCS) {}
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c

	@Query()
	async getCategories() {
		const data = await this.productService.send('getCategories', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Category)
	async getCategoryById(@Args('_id') _id: String): Promise<Category> {
		const data = await this.productService.send('getCategoryById', _id)
<<<<<<< HEAD
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
=======
		console.log('data: ', data)
		console.log(`id : ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		if (data == null) {
			throw new ApolloError('Category déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Category)
	async createCategory(
		@Args('input') input: CreateCategoryInput
	): Promise<Category> {
<<<<<<< HEAD
		Logger.log(input)
		const data = await this.productService.send('createCategory', input)
		Logger.log(`function:createCategory, res: ${data}`)
=======
		console.log(input)
		const data = await this.productService.send('createCategory', input)
		console.log(`function:createCategory, res: ${data}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Category)
	async updateCategory(
		@Args('_id') _id: String,
		@Args('input') input: UpdateCategoryInput
	): Promise<Category> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateCategory', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteCategory(@Args('_id') _id: String): Promise<boolean> {
<<<<<<< HEAD
		Logger.log(`function:deleteCategory, input: ${_id}`)
=======
		console.log(`function:deleteCategory, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.productService.send('deleteCategory', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
