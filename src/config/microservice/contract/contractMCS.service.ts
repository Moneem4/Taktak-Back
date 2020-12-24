import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ContractMCS {
	constructor(
		@Inject('CONTRACT-SERVICE') private readonly client: ClientProxy
	) {
		console.log('init CONTRACT-SERVICE')
	}

	public send(pattern: string, data: any) {
		return this.client.send(pattern, data).toPromise()
	}
}
