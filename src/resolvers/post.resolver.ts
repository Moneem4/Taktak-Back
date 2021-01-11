import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import { Post } from '@models'
import {
	CreateMbPostInput,
	User,
	UpdateMbPostInput,
	MbPost
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PostMCS } from '../config/microservice/post/postMCS.service'
@Resolver('Post')
export class PostResolver {
	constructor(private readonly postService: PostMCS) {
		console.log('post.resolver')
	}

	@Query()
	async getMbPosts() {
		//Logger.log(`function:getMbPostComment, input: ${mbPostId}`);
		const data = await this.postService.send('getMbPosts', {})
		//Logger.log(data);
		return data
	}
	//to check {Access null ...}
	//-------------------------------------------------------------------------------------------------------- finished

	@Query(() => Post)
	async getMbPostById(@Args('_id') _id: string): Promise<MbPost> {
		const data = await this.postService.send('getMbPostById', _id)
		Logger.log('data: ', data)
		Logger.log(`id : ${_id}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => MbPost)
	async createMbPost(@Args('input') input: CreateMbPostInput): Promise<MbPost> {
		//Logger.log(`function:createPost`);
		Logger.log(input)
		const data = await this.postService.send('createMbPost', input)
		Logger.log(`function:createPost, res: ${data}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => MbPost)
	async updateMbPost(
		@Args('_id') _id: string,
		@Args('input') input: UpdateMbPostInput
	): Promise<MbPost> {
		const messageData = { _id, ...input }
		const data = await this.postService.send('updateMbPost', messageData)

		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deleteMbPost(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteMbPost, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postService.send('deleteMbPost', _id)
		console.log('++++++', data)
		return data
	}
	//----------------------------------------------------------------------------------------------- finished

	@Mutation()
	async deleteUserMbPosts(@Args('userId') userId: String): Promise<boolean> {
		const data = await this.postService.send('deleteUserMbPosts', userId)

		return data
	}
}
