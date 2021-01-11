import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreateRatingInput,
	UpdateRatingInput,
	Rating
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { ApolloError } from 'apollo-server-express'
import { ProductMCS } from '../config/microservice/product/productMCS.service'

@Resolver('Rating')
export class RatingResolver {
	constructor(private readonly ratingService: ProductMCS) {
		console.log('Rating.resolver')
	}

	@Query()
	async getRatings() {
		const data = await this.ratingService.send('getRatings', {})

		return data
	}

	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => Rating)
	async getRatingById(@Args('_id') _id: string): Promise<Rating> {
		const data = await this.ratingService.send('getRatingById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		if (data == null) {
			throw new ApolloError('Rating déja supprimé +++++')
		} else {
			return data
		}
	}

	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Rating)
	async createRating(@Args('input') input: CreateRatingInput): Promise<Rating> {
		// Logger.log(`function:createRating`);
		Logger.log(input)
		const data = await this.ratingService.send('createRating', input)
		Logger.log(`function:createRating, res: ${data}`)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Rating)
	async updateRating(
		@Args('_id') _id: string,
		@Args('input') input: UpdateRatingInput
	): Promise<Rating> {
		const messageData = { _id, ...input }
		const data = await this.ratingService.send('updateRating', messageData)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteRating(@Args('_id') _id: string): Promise<boolean> {
		Logger.log(`function:deleteRating, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.ratingService.send('deleteRating', _id)
		console.log('++++++', data)
		return data
	}
	// ----------------------------------------------------------------------------------------------- finished
}
