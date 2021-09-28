import { Entity, ObjectIdColumn, Column } from 'typeorm'
import * as uuid from 'uuid'
import { Expose, plainToClass } from 'class-transformer'
import { User } from '../generator/graphql.schema'
import { MessageItemType } from '../generator/graphql.schema'

@Entity({
	name: 'messageItem',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class MessageItem {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	itemType: MessageItemType

	@Expose()
	@Column()
	itemPath: string

	constructor(messageItem: Partial<MessageItem>) {
		if (messageItem) {
			Object.assign(
				this,
				plainToClass(MessageItem, messageItem, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
			this.itemType = this.itemType
			this.itemPath = this.itemPath
		}
	}
}
