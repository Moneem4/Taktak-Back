import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateCategoryInput,
	UpdateCategoryInput,
	CategoryT
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('Category')
export class CategoryResolver {
	constructor(private readonly productService: ProductMCS) {
		console.log('Category.resolver')
	}

	@Query()
	async getCategoriesT() {
		const data = await this.productService.send('getCategoriesT', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => CategoryT)
	async getCategoryTById(@Args('_id') _id: string): Promise<CategoryT> {
		const data = await this.productService.send('getCategoryByIdT', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('Category déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => CategoryT)
	async createCategoryT(
		@Args('input') input: CreateCategoryInput
	): Promise<CategoryT> {
		Logger.log(input)
		const data = await this.productService.send('createCategoryT', input)
		Logger.log(`function:createCategory, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => CategoryT)
	async updateCategoryT(
		@Args('_id') _id: string,
		@Args('input') input: UpdateCategoryInput
	): Promise<CategoryT> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateCategoryT', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteCategoryT(@Args('_id') _id: string): Promise<boolean> {
		Logger.log(`function:deleteCategory, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.productService.send('deleteCategoryT', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
