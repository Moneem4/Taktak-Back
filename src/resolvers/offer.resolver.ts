import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateOfferInput,
	UpdateOfferInput,
	Offer
} from '../generator/graphql.schema'

import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('Offer')
export class OfferResolver {
	constructor(private readonly productService: ProductMCS) {
		console.log('Offer.resolver')
	}

	@Query()
	async getOffers() {
		const data = await this.productService.send('getOffersT', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Offer)
	async getOfferById(@Args('_id') _id: string): Promise<Offer> {
		const data = await this.productService.send('getOfferByIdT', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('Offer déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Offer)
	async createOffer(@Args('input') input: CreateOfferInput): Promise<Offer> {
		// console.log(`function:createOffer`);
		console.log(input)
		const data = await this.productService.send('createOfferT', input)
		if(data==null)
		{throw new ApolloError('verify the product of the offer, maybe doesn t exist ')}
		else
		{return data }
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Offer)
	async updateOffer(
		@Args('_id') _id: string,
		@Args('input') input: UpdateOfferInput
	): Promise<Offer> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateOfferT', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteOffer(@Args('_id') _id: string): Promise<boolean> {
		console.log(`function:deleteOffer, input: ${_id}`)
		
		const data = await this.productService.send('deleteOfferT', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
