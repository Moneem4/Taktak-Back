import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateOfferInput,
	UpdateOfferInput,
	Offer
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('Offer')
export class OfferResolver {
	constructor(private readonly productService: ProductMCS) {
		console.log('Offer.resolver')
	}

	@Query()
	async getOffers() {
		const data = await this.productService.send('getOffers', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Offer)
	async getOfferById(@Args('_id') _id: string): Promise<Offer> {
		const data = await this.productService.send('getOfferById', _id)
<<<<<<< HEAD
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
=======
		console.log('data: ', data)
		console.log(`id : ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		if (data == null) {
			throw new ApolloError('Offer déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Offer)
	async createOffer(@Args('input') input: CreateOfferInput): Promise<Offer> {
<<<<<<< HEAD
		// Logger.log(`function:createOffer`);
		Logger.log(input)
		const data = await this.productService.send('createOffer', input)
		Logger.log(`function:createOffer, res: ${data}`)
=======
		// console.log(`function:createOffer`);
		console.log(input)
		const data = await this.productService.send('createOffer', input)
		console.log(`function:createOffer, res: ${data}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Offer)
	async updateOffer(
		@Args('_id') _id: string,
		@Args('input') input: UpdateOfferInput
	): Promise<Offer> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateOffer', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteOffer(@Args('_id') _id: string): Promise<boolean> {
<<<<<<< HEAD
		Logger.log(`function:deleteOffer, input: ${_id}`)
=======
		console.log(`function:deleteOffer, input: ${_id}`)
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
		console.log('-------' + _id)
		const data = await this.productService.send('deleteOffer', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
