import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

import { PostLike } from '@models'
import { CreatePostLikeInput } from '../generator/graphql.schema'

import { PostMCS } from '../config/microservice/post/postMCS.service'

@Resolver('PostLike')
export class PostLikeResolver {
	constructor(private readonly postService: PostMCS) {
		console.log('postLike.resolver');
	}

	@Query()
	async postLikes(@Args('postId') postId: string) {
		//console.log(`function:getPostComment, input: ${postId}`);
		const data = await this.postService.send('getPostLikes', postId);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Query()
	async postLikeByUserId(@Args('userId') userId: string) {
		//console.log(`function:getPostComment, input: ${postId}`);
		const data = await this.postService.send('getPostLikeByUserId', userId);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Query(() => PostLike)
	async postLikeById(@Args('_id') _id: string): Promise<PostLike> {
		const data = await this.postService.send('getPostLikeById', _id);
		console.log(`id : ${_id}`);
		return data;
	}

	@Mutation(() => PostLike)
	async createPostLike(
		@Args('input') input: CreatePostLikeInput
	): Promise<PostLike> {
		console.log(input)
		const data = await this.postService.send('createPostLike', input);
		console.log(`function:createPostLike, res: `, data);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Mutation(() => Boolean)
	async deletePostLike(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deletePostLike, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postService.send('deletePostLike', _id)
		console.log('++++++', data);
		return data;
	}	
}
