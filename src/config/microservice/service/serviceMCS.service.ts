import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ServiceMCS {
	constructor(
		@Inject('SERVICES_SERVICE') private readonly client: ClientProxy
<<<<<<< HEAD
	) {
		console.log('init SERVICE-SERVICE')
	}
=======
	) {}
>>>>>>> 7c7d3bb85c9b9612e66b9dca906efde7be340b7c

	public send(pattern: string, data: any) {
		return this.client.send(pattern, data).toPromise()
	}
}
