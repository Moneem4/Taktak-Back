import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'

import {
	CreatePromotionInput,
	UpdatePromotionInput,
	Promotion
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { PostMCS } from '../config/microservice/post/postMCS.service'


@Resolver('Promotion')
export class PromotionResolver {	
	constructor(private readonly postMCS: PostMCS) {
		console.log('promotion.resolver')
	}

	@Query()
	async promotions() {
		//console.log(`function:getPostComment, input: ${postId}`);
		const data = await this.postMCS.send('getPromotions', {})
		//console.log(data);
		return data;
	}	
	//-------------------------------------------------------------------------------------------------------- 

	@Query(() => Promotion)
	async promotionById(@Args('_id') _id: string): Promise<Promotion> {
		const data = await this.postMCS.send('getPromotionById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Query()
	async promotionsByUserId(@Args('userId') userId: string) {
		//console.log(`function:getPostComment, input: ${postId}`);
		const data = await this.postMCS.send('getPromotionsByUserId', userId);
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Promotion)
	async createPromotion(@Args('input') input: CreatePromotionInput): Promise<Promotion> {
		//console.log(`function:createPromotion`);
		console.log(input)
		const data = await this.postMCS.send('createPromotion', input)
		console.log(`function:createPromotion, res: ${data}`)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Promotion)
	async updatePromotion(
		@Args('_id') _id: string,
		@Args('input') input: UpdatePromotionInput): Promise<Promotion> {
		const messageData = { _id, ...input }
		const data = await this.postMCS.send('updatePromotion', messageData);
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Boolean)
	async deletePromotion(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deletePromotion, input: ${_id}`)		
		const data = await this.postMCS.send('deletePromotion', _id);		
		return data;
	}
}
