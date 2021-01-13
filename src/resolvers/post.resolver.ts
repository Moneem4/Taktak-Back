<<<<<<< HEAD
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
=======
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { Post } from '@models'
import {
	CreatePostInput,
	UpdatePostInput,
	
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { PostMCS } from '../config/microservice/post/postMCS.service'


@Resolver('Post')
export class PostResolver {

>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
	constructor(private readonly postService: PostMCS) {
		console.log('post.resolver')
	}

	@Query()
<<<<<<< HEAD
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
=======
	async posts() {
		//console.log(`function:getPostComment, input: ${postId}`);
		const data = await this.postService.send('getPosts', {})
		//console.log(data);
		return data
	}
	//----------------------------------------------------------------------------------------------

	@Query(() => Post)
	async postById(@Args('_id') _id: string): Promise<Post> {
		const data = await this.postService.send('getPostById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Post)
	async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
		//console.log(`function:createPost`);
		console.log(input)
		const data = await this.postService.send('createPost', input)
		console.log(`function:createPost, res: ${data}`)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Post)
	async updatePost(
		@Args('_id') _id: string,
		@Args('input') input: UpdatePostInput
	): Promise<Post> {
		const messageData = { _id, ...input }
		const data = await this.postService.send('updatePost', messageData)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Boolean)
	async deletePost(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deletePost, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postService.send('deletePost', _id)
		console.log('++++++', data)
		return data;
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
	}
}
