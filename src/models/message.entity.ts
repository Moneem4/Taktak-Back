import { Entity, ObjectIdColumn, Column } from 'typeorm'
import * as uuid from 'uuid'
import { Expose, plainToClass } from 'class-transformer'

import { User } from '../generator/graphql.schema'

@Entity({
	name: 'messages',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Message {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	text: string

	@Expose()
	@ObjectIdColumn()
	conversationId: string

	@Expose()
	@Column()
	createdBy: User[]

	@Expose()
	@Column()
	createdAt: number
	@Expose()
	@Column()
	updatedAt: number

	constructor(message: Partial<Message>) {
		if (message) {
			Object.assign(
				this,
				plainToClass(Message, message, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
			this.createdAt = this.createdAt || +new Date()
			this.updatedAt = +new Date()
		}
	}
}
