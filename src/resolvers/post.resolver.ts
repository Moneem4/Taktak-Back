import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
//import { Post } from '@models'
import {
	CreatePostInput,
	UpdatePostInput,
	Post
	
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'
import { PostMCS } from '../config/microservice/post/postMCS.service'


@Resolver('Post')
export class PostResolver {

	constructor(private readonly postService: PostMCS) {
		console.log('post.resolver')
	}

	@Query()
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
	}
}
