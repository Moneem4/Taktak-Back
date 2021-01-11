import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

import { PostAccess } from '@models'
import {
<<<<<<< HEAD
	CreateMbPostAccessInput,
	UpdateMbPostAccessInput,
	MbPost,
	MbPostAccess
} from '../generator/graphql.schema'
import { ClientProxy } from '@nestjs/microservices'
=======
	CreatePostAccessInput,
	UpdatePostAccessInput
	
	
} from '../generator/graphql.schema'
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
import { Inject, Logger } from '@nestjs/common'
import { PostMCS } from '../config/microservice/post/postMCS.service'
@Resolver('PostAccess')
export class PostAccessResolver {
<<<<<<< HEAD
	constructor(private readonly postService: PostMCS) {
		console.log('postAccess.resolver')
	}

	@Query()
	async mbPostAccess(@Args('mbPostId') mbPostId: string) {
		//Logger.log(`function:getMbPostAccesses, input: ${mbPostId}`);
		const data = await this.postService.send('getMbPostAccesses', mbPostId)

		//Logger.log(data);
		return data
	}
	//-------------------------------------------------------------------------------------------------------- finished

	@Query(() => PostAccess)
	async getMbPostAccessById(@Args('_id') _id: string): Promise<PostAccess> {
		const data = await this.postService.send('getMbPostAccessesById', _id)

		Logger.log(`id : ${_id}`)
		return data
	}
	//-------------------------------------------------------------------------------------------------------- finished

	@Mutation(() => PostAccess)
	async createMbPostAccess(
		@Args('input') input: CreateMbPostAccessInput
	): Promise<PostAccess> {
		Logger.log(input)
		const data = await this.postService.send('createMbPostAccess', input)

		console.log(`function:createPostAccess, res: `, data)
		return data
	}

	@Mutation(() => PostAccess)
	async updateMbPostAccess(
		@Args('_id') _id: String,
		@Args('input') input: UpdateMbPostAccessInput
	): Promise<MbPostAccess> {
		const messageData = { _id, ...input }
		const data = await this.postService.send('updateMbPostAccess', messageData)

		console.log(data)
		return data
	}

	@Mutation(() => Boolean)
	async deleteMbPostAccess(@Args('_id') _id: String): Promise<boolean> {
		Logger.log(`function:deleteMbPostAccesses, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postService.send('deleteMbPostAccess', _id)

		console.log('++++++', data)
		return data
	}

	@Mutation(() => Boolean)
	async deleteUserMbPostAccesss(
		@Args('userId') userId: String
	): Promise<boolean> {
		const data = await this.postService.send('deleteUserMbPostAccesss', userId)

		return data
=======
	
	constructor(private readonly postService: PostMCS) {
		console.log('postAccess.resolver');
	}
	

	@Query()
	async postAccesses(@Args('postId') postId: string) {
		//console.log(`function:getPostAccesses, input: ${postId}`);
		const data = await this.postService.send('getPostAccesses', postId);		
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Query(() => PostAccess)
	async PostAccessById(@Args('_id') _id: string): Promise<PostAccess> {
		const data = await this.postService.send('getPostAccessesById', _id);
		console.log(`id : ${_id}`);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Mutation(() => PostAccess)
	async createPostAccess(
		@Args('input') input: CreatePostAccessInput
	): Promise<PostAccess> {
		console.log(input)
		const data = await this.postService.send('createPostAccess', input);
		console.log(`function:createPostAccess, res: `, data);
		return data;
	}

	@Mutation(() => PostAccess)
	async updatePostAccess(
		@Args('_id') _id: String,
		@Args('input') input: UpdatePostAccessInput
	): Promise<PostAccess> {
		const messageData = { _id, ...input }
		const data = await this.postService.send('updatePostAccess', messageData);
		console.log(data);
		return data;
	}

	@Mutation(() => Boolean)
	async deletePostAccess(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deletePostAccesses, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postService.send('deletePostAccess', _id);
		console.log('++++++', data);
		return data;
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
	}
}
