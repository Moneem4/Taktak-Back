import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateProductInput,
	UpdateProductInput,
	Product
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('Product')
export class ProductResolver {
	constructor(private readonly productService: ProductMCS) {
		console.log('Product.resolver')
	}

	@Query()
	async getProducts() {
		const data = await this.productService.send('getProductsT', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Product)
	async getProductById(@Args('_id') _id: string): Promise<Product> {
		const data = await this.productService.send('getProductByIdT', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('Product déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Product)
	async createProduct(
		@Args('input') input: CreateProductInput
	): Promise<Product> {
		// console.log(`function:createProduct`);
		console.log(input)
		const data = await this.productService.send('createProductT', input)
		if(data==null)
		{throw new ApolloError('verify the category or the menu  of the product, maybe doesn t exist ')}
		else
		{return data }
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Product)
	async updateProduct(
		@Args('_id') _id: string,
		@Args('input') input: UpdateProductInput
	): Promise<Product> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateProductT', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteProduct(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteProduct, input: ${_id}`)
		
		const data = await this.productService.send('deleteProductT', _id)
		
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
