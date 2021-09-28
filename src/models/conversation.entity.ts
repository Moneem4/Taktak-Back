import {
	Entity,
	ObjectIdColumn,
	Column,
	BeforeInsert,
	BeforeUpdate
} from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'

import { User, Message } from '@models'

@Entity({
	name: 'conversation',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Conversation {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	userId: string

	@Expose()
	@Column()
	participantId: string

	@Expose()
	@Column()
	lastMessageId: string

	@Expose()
	@Column()
	createdAt: number
	@Expose()
	@Column()
	updatedAt: number

	constructor(conversation: Partial<Conversation>) {
		if (conversation) {
			Object.assign(
				this,
				plainToClass(Conversation, conversation, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
			this.userId = this.userId
			this.participantId = this.participantId
			this.lastMessageId = this.lastMessageId
			this.createdAt = this.createdAt || +new Date()
			this.updatedAt = +new Date()
		}
	}
}
