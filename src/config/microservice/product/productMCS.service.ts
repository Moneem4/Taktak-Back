import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ProductMCS {
	constructor(
		@Inject(' Product-SERVICE') private readonly client: ClientProxy
	) {
		console.log('init  Product-SERVICE')
	}

	public send(pattern: string, data: any) {
		return this.client.send(pattern, data).toPromise()
	}
}
