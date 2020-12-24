import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateOfferInput,
	UpdateOfferInput,
	OfferT
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
	async getOffersT() {
		const data = await this.productService.send('getOffersT', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => OfferT)
	async getOfferTById(@Args('_id') _id: string): Promise<OfferT> {
		const data = await this.productService.send('getOfferByIdT', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('Offer déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => OfferT)
	async createOfferT(@Args('input') input: CreateOfferInput): Promise<OfferT> {
		// Logger.log(`function:createOffer`);
		Logger.log(input)
		const data = await this.productService.send('createOfferT', input)
		Logger.log(`function:createOffer, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => OfferT)
	async updateOfferT(
		@Args('_id') _id: string,
		@Args('input') input: UpdateOfferInput
	): Promise<OfferT> {
		const messageData = { _id, ...input }
		const data = await this.productService.send('updateOfferT', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteOfferT(@Args('_id') _id: string): Promise<boolean> {
		Logger.log(`function:deleteOffer, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.productService.send('deleteOfferT', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
