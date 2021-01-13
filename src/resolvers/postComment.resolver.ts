import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'

<<<<<<< HEAD
import { PostComment } from '@models'
import {
	CreatePostCommentInput,
	MbPostComment,
=======
import {
	CreatePostCommentInput,
	PostComment,
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
	UpdatePostCommentInput
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { PostMCS } from '../config/microservice/post/postMCS.service'
<<<<<<< HEAD
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
=======

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
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c

	@Mutation(() => PostComment)
	async createPostComment(
		@Args('input') input: CreatePostCommentInput
	): Promise<PostComment> {
<<<<<<< HEAD
		Logger.log(input)
		const data = await this.postService.send('createMbPostComment', input)
		console.log(`function:createPostComment, res: `, data)
		return data
	}
	// -------------------------------------------------------------------------------------------------------- finished
=======
		console.log(input)
		const data = await this.postService.send('createPostComment', input);
		console.log(`function:createPostComment, res: `, data);
		return data;
	}
	//-------------------------------------------------------------------------------------------------------- 
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c

	@Mutation(() => PostComment)
	async updatePostComment(
		@Args('_id') _id: string,
		@Args('input') input: UpdatePostCommentInput
<<<<<<< HEAD
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
=======
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
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c
}
