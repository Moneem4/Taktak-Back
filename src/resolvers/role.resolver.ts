import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { getMongoRepository } from 'typeorm'
import { ForbiddenError } from 'apollo-server-core'

import { Role, Permission } from '@models'
import { CreateRoleInput } from '../generator/graphql.schema'

@Resolver('Role')
export class RoleResolver {
	@Query()
	async roles(): Promise<Role[]> {
		return getMongoRepository(Role).find({
			cache: true
		})
	}

	@Mutation()
	async createRole(@Args('input') input: CreateRoleInput) {
		const { permissions } = input

		if (permissions.length < 1) {
			throw new ForbiddenError('Permissions must be greater than 0.')
		}

		const foundPermissions = getMongoRepository(Permission).find({
			where: {
				_id: {
					$in: permissions
				}
			}
		})

		if (!foundPermissions) {
			throw new ForbiddenError('Permissions not foud.')
		}

		return await getMongoRepository(Role).save(new Role({ ...input }))
	}
}
