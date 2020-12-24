import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ChatMCS {
	constructor(@Inject('CHAT-SERVICE') private readonly client: ClientProxy) {
		console.log('init CHAT-SERVICE')
	}

	public send(pattern: string, data: any) {
		return this.client.send(pattern, data).toPromise()
	}
}