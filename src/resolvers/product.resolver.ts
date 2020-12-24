import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateProductInput,
	UpdateProductInput,
	ProductT
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('ProductT')
export class ProductResolver {
	constructor(private readonly productService: ProductMCS) {
		console.log('Product.resolver')
	}

	@Query()
	async getProductsT() {
		const data = await this.productService.send('getProductsT', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => ProductT)
	async getProductTById(@Args('_id') _id: string): Promise<ProductT> {
		const data = await this.productService.send('getProductByIdT', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('Product déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => ProductT)
	async createProductT(
		@Args('input') input: CreateProductInput
	): Promise<ProductT> {
		// Logger.log(`function:createProduct`);
		Logger.log(input)
		const data = await this.productService.send('createProductT', input)
		Logger.log(`function:createProduct, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => ProductT)
	async updateProductT(
		@Args('_id') _id: string,
		@Args('input') input: UpdateProductInput
	): Promise<ProductT> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateProductT', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteProductT(@Args('_id') _id: string): Promise<boolean> {
		Logger.log(`function:deleteProduct, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.productService.send('deleteProductT', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
