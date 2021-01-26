import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

import { PostAccess } from '@models'
import {
	CreatePostAccessInput,
	UpdatePostAccessInput,
	
	
	
} from '../generator/graphql.schema'
import { Inject, Logger } from '@nestjs/common'
import { PostMCS } from '../config/microservice/post/postMCS.service'
@Resolver('PostAccess')
export class PostAccessResolver {
	
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
	}
}
