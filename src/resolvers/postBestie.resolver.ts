import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
import {
	CreatePostBestieInput,
	PostBestie,
	
} from '../generator/graphql.schema'
import { Logger } from '@nestjs/common'

import { PostMCS } from '../config/microservice/post/postMCS.service'


@Resolver('PostBestie')
export class PostBestieResolver {
	constructor(private readonly postMCS: PostMCS) {
		console.log('post.resolver')
	}

	@Query()
	async postBesties() {
		//console.log(`function:getPostBestie, input: ${postBestie}`);
		const data = await this.postMCS.send('getPostBesties', {})
		//console.log(data);
		return data;
	}
	//----------------------------------------------------------------------------------------------

	@Query(() => PostBestie)
	async postBestieById(@Args('_id') _id: string): Promise<PostBestie> {
		const data = await this.postMCS.send('getPostBestieById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => PostBestie)
	async createPostBestie(@Args('input') input: CreatePostBestieInput): Promise<PostBestie> {
		console.log("heeereeeeee in resolver",input);
		console.log(`function:createPostBestie`);
		console.log(input);
		const data = await this.postMCS.send('createPostBestie', input);
		console.log(`function:createPost, res: ${data}`);
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Boolean)
	async deletePostBestie(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deletePostBestie, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postMCS.send('deletePostBestie', _id)
		console.log('++++++', data)
		return data;
	}
}
