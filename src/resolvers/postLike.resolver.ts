import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

import { PostLike } from '@models'
<<<<<<< HEAD
import { CreateMbPostLikeInput } from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { PostMCS } from '../config/microservice/post/postMCS.service'
@Resolver('PostLike')
export class PostLikeResolver {
	constructor(private readonly postService: PostMCS) {
		console.log('postLike.resolver')
	}

	@Query()
	async mbPostLikes(@Args('mbPostId') mbPostId: string) {
		// Logger.log(`function:getMbPostComment, input: ${mbPostId}`);
		const data = await this.postService.send('getMbPostLikes', mbPostId)

		// Logger.log(data);
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => PostLike)
	async getMbPostLikeById(@Args('_id') _id: string): Promise<PostLike> {
		const data = await this.postService.send('getMbPostLikeById', _id)

		Logger.log(`id : ${_id}`)
		return data
	}

	@Mutation(() => PostLike)
	async createMbPostLike(
		@Args('input') input: CreateMbPostLikeInput
	): Promise<PostLike> {
		Logger.log(input)
		const data = await this.postService.send('createMbPostLike', input)

		console.log(`function:createPostLike, res: `, data)
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteMbPostLike(@Args('_id') _id: string): Promise<boolean> {
		Logger.log(`function:deleteMbPostLike, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postService.send('deleteMbPostLike', _id)

		console.log('++++++', data)
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Mutation()
	async deleteMbUserLikes(@Args('userId') userId: string): Promise<Boolean> {
		const data = await this.postService.send('deleteUserMbPostLikes', userId)

		return data
	}
=======
import { CreatePostLikeInput } from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
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
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
}
