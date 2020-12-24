import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

import { PostComment } from '@models'
import {
	CreatePostCommentInput,
	MbPostComment,
	UpdatePostCommentInput
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { PostMCS } from '../config/microservice/post/postMCS.service'
@Resolver('PostComment')
export class PostCommentResolver {
	constructor(private readonly postService: PostMCS) {
		console.log('postComment.resolver')
	}

	@Query()
	async postComments(@Args('mbPostId') mbPostId: string) {
		// Logger.log(`function:getMbPostComment, input: ${mbPostId}`);
		const data = await this.postService.send('getMbPostComment', mbPostId)
		// Logger.log(data);
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Query(() => PostComment)
	async getMbPostCommentById(@Args('_id') _id: string): Promise<PostComment> {
		const data = await this.postService.send('getMbPostCommentById', _id)
		Logger.log(`id : ${_id}`)
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Mutation(() => PostComment)
	async createPostComment(
		@Args('input') input: CreatePostCommentInput
	): Promise<PostComment> {
		Logger.log(input)
		const data = await this.postService.send('createMbPostComment', input)
		console.log(`function:createPostComment, res: `, data)
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Mutation(() => PostComment)
	async updatePostComment(
		@Args('_id') _id: string,
		@Args('input') input: UpdatePostCommentInput
	): Promise<MbPostComment> {
		const messageData = { _id, ...input }
		const data = await this.postService.send('updateMbPostComment', messageData)
		console.log(data)
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	@Mutation(() => Boolean)
	async deletePostComment(@Args('_id') _id: string): Promise<boolean> {
		Logger.log(`function:deleteMbPostAccesses, input: ${_id}`)
		const data = await this.postService.send('deleteMbPostComment', _id)
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished

	// @Mutation()
	// async deleteUserPostComments(@Args('userId')userId: string): Promise<Boolean> {
	//     const data = await this.postService.send('deleteUserMbPostComments', userId);
	//     return data
	// }
}
