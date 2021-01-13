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
		const data = await this.productService.send('getProducts', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Product)
	async getProductById(@Args('_id') _id: string): Promise<Product> {
		const data = await this.productService.send('getProductById', _id)
<<<<<<< HEAD
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
=======
		console.log('data: ', data)
		console.log(`id : ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
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
<<<<<<< HEAD
		// Logger.log(`function:createProduct`);
		Logger.log(input)
		const data = await this.productService.send('createProduct', input)
		Logger.log(`function:createProduct, res: ${data}`)
=======
		// console.log(`function:createProduct`);
		console.log(input)
		const data = await this.productService.send('createProduct', input)
		console.log(`function:createProduct, res: ${data}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Product)
	async updateProduct(
		@Args('_id') _id: string,
		@Args('input') input: UpdateProductInput
	): Promise<Product> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateProduct', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteProduct(@Args('_id') _id: string): Promise<boolean> {
<<<<<<< HEAD
		Logger.log(`function:deleteProduct, input: ${_id}`)
=======
		console.log(`function:deleteProduct, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.productService.send('deleteProduct', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
