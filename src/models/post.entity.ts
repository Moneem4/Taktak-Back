import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'
import {
	MbPostType,
	MbPostLike,
	MbPostAccess,
	MbPostComment,
	MbPost
} from '../generator/graphql.schema'

@Entity({
	name: 'MbPost',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Post {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	userId: string

	@Expose()
	@Column()
	postType: MbPostType

	@Expose()
	@Column()
	title: String

	@Expose()
	@Column()
	likes: MbPostLike[]

	@Expose()
	@Column()
	accesses: MbPostAccess[]

	@Expose()
	@Column()
	comments: MbPostComment[]

	@Expose()
	@Column()
	createdAt: number
	@Expose()
	@Column()
	updatedAt: number

	constructor(post: Partial<MbPost>) {
		if (post) {
			Object.assign(
				this,
				plainToClass(Post, post, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
			this.userId = this.userId || ''
			this.postType = this.postType || undefined
			this.title = this.title || ''
			this.accesses = this.accesses || []
			this.createdAt = this.createdAt || +new Date()
			this.updatedAt = +new Date()
		}
	}
}
