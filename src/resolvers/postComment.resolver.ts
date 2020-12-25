import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

import {
	CreatePostCommentInput,
	PostComment,
	UpdatePostCommentInput
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { PostMCS } from '../config/microservice/post/postMCS.service'

@Resolver('PostComment')
export class PostCommentResolver {
	
	constructor(private readonly postService: PostMCS) {
		console.log('postComment.resolver');
	}

	@Query()
	async postComments(@Args('postId') postId: string) {
		//console.log(`function:getPostComment, input: ${PostId}`);
		const data = await this.postService.send('getPostComment', postId)
		//console.log(data);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Query(() => PostComment)
	async postCommentById(@Args('_id') _id: string): Promise<PostComment> {
		const data = await this.postService.send('getPostCommentById', _id)
		console.log(`id : ${_id}`);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Mutation(() => PostComment)
	async createPostComment(
		@Args('input') input: CreatePostCommentInput
	): Promise<PostComment> {
		console.log(input)
		const data = await this.postService.send('createPostComment', input);
		console.log(`function:createPostComment, res: `, data);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Mutation(() => PostComment)
	async updatePostComment(
		@Args('_id') _id: string,
		@Args('input') input: UpdatePostCommentInput
	): Promise<PostComment> {
		const messageData = { _id, ...input }
		const data = await this.postService.send('updatePostComment', messageData);
		console.log(data);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 

	@Mutation(() => Boolean)
	async deletePostComment(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deletePostAccesses, input: ${_id}`)
		const data = await this.postService.send('deletePostComment', _id);
		return data;
	}
}
