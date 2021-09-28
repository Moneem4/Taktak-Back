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
	constructor(private readonly productService: ProductMCS) {}

	@Query()
	async getCategories() {
		const data = await this.productService.send('getCategoriesT', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Category)
	async getCategoryById(@Args('_id') _id: String): Promise<Category> {
		const data = await this.productService.send('getCategoryByIdT', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
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
		console.log(input)
		const data = await this.productService.send('createCategoryT', input)
		console.log(`function:createCategory, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Category)
	async updateCategory(
		@Args('_id') _id: String,
		@Args('input') input: UpdateCategoryInput
	): Promise<Category> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateCategoryT', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteCategory(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteCategory, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.productService.send('deleteCategoryT', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
