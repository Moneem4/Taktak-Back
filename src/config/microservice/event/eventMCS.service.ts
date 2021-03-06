import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class EventMCS {
	constructor(@Inject('EVENT-SERVICE') private readonly client: ClientProxy) {
		console.log('init EVENT-SERVICE')
	}

	public send(pattern: string, data: any) {
		return this.client.send(pattern, data).toPromise()
	}
}
