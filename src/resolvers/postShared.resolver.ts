import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import {
	CreatePostSharedInput,
	PostShared,
	User
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { PostMCS } from 'config/microservice/post/postMCS.service'
@Resolver('PostShared')
export class PostSharedResolver {
	constructor(private readonly postMCS: PostMCS) {

		console.log('postshared.resolver')
	}

	@Query()
	async postShared() {
		const data = await this.postMCS.send('getPostShared', {})
		//console.log(data);
		return data;
	}
	//-----------------------------------------------------------------------------------------------

	@Query(() => PostShared)
	async postSharedById(@Args('_id') _id: string): Promise<PostShared> {
		const data = await this.postMCS.send('getPostSharedById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => PostShared)
	async createPostShared(@Args('input') input: CreatePostSharedInput): Promise<PostShared> {
		//console.log(`function:createPostShared`);
		console.log(input)
		const data = await this.postMCS.send('createPostShared', input)
		console.log(`function:createPostShared, res: ${data}`)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 
	
	@Mutation(() => Boolean)
	async deletePostShared(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deletePostShared, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postMCS.send('deletePostShared', _id)
		console.log('++++++', data)
		return data;
	}
}
