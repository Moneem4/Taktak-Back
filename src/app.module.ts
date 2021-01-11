import { CacheModule, Module, HttpModule } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

// import { BullModule } from '@nestjs/bull'

import {
	CacheService,
	GraphqlService,
	TypeOrmService
	// BullConfigService
} from './config'
import { AppController } from './app.controller'
// import { AppProcessor } from './app.processor'
import { DateScalar } from './config/graphql/scalars/date.scalar'
import { UploadScalar } from './config/graphql/scalars/upload.scalar'
import * as rabbitmqMicroservice from './config/microservice/index'

import * as Resolvers from './resolvers'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		GraphQLModule.forRootAsync({
			useClass: GraphqlService
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmService
		}),
		CacheModule.registerAsync({
			useClass: CacheService
		}),
		HttpModule,
		...Object.values(rabbitmqMicroservice)
	],
	controllers: [AppController],
	providers: [
		DateScalar,
		UploadScalar,
		...Object.values(Resolvers)
		// AppProcessor
	]
})
export class AppModule {}
