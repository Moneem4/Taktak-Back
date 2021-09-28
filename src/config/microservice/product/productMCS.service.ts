import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ProductMCS {
	constructor(@Inject('PRODUCT-SERVICE') private readonly client: ClientProxy) {
	}

	public send(pattern: string, data: any) {
		return this.client.send(pattern, data).toPromise()
	}
}
