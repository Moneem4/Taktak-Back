import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql'
//import { Post } from '@models'
import {
	CreateStoryInput,
	Story,
	User,
	Post
} from '../generator/graphql.schema'
import { Logger, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PostMCS } from '../config/microservice/post/postMCS.service'



@Resolver('Story')
export class StoryResolver {
	constructor(private readonly postMCS: PostMCS) {
		console.log('story.resolver')
	}

	@Query()
	async stories() {
		const data = await this.postMCS.send('getStories', {})
		//console.log(data);
		return data;
	}
	
	//----------------------------------------------------------------------------------------------

	@Query(() => Story)
	async storyById(@Args('_id') _id: string): Promise<Story> {
		const data = await this.postMCS.send('getStoryById', _id)
		console.log('data: ', data)
		console.log(`id : ${_id}`)
		return data;
	}
    //----------------------------------------------------------------------------------------------- 
    
    @Query(() => Story)
	async storiesByUserId(@Args('userId') userId: string): Promise<Story> {
		const data = await this.postMCS.send('getStoriesByUserId', userId);		
		return data;
	}
	//----------------------------------------------------------------------------------------------- 

	@Mutation(() => Story)
	async createStory(@Args('input') input: CreateStoryInput): Promise<Story> {
		//console.log(`function:createStory`);		
		const data = await this.postMCS.send('createStory', input)
		console.log(`function:createStory, res: ${data}`)
		return data;
	}
	//----------------------------------------------------------------------------------------------- 
	
	@Mutation(() => Boolean)
	async deleteStory(@Args('_id') _id: String): Promise<boolean> {
		console.log(`function:deleteStory, input: ${_id}`)
		console.log('-------' + _id)
		const data = await this.postMCS.send('deleteStory', _id)
		console.log('++++++', data)
		return data;
	}
}
