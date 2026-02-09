import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from '../auth/dto/auth.dto'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'

import { startOfDay, subDays } from 'date-fns'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				createdAt: true,
				updatedAt: true,
				email: true,
				name: true,
				workInterval: true,
				breakInterval: true,
				intervalsCount: true,
				tasks: true // relations можно выбирать в select
			}
		})
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		const totalTask = profile?.tasks.length
		const completedTask = await this.prisma.task.count({
			where: {
				userId: id,
				isCompleted: true
			}
		})

		const todayStart = startOfDay(new Date())
		const weekStart = startOfDay(subDays(new Date(), 7))

		const todayTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: todayStart.toISOString()
				}
			}
		})

		const weekTasks = await this.prisma.task.count({
			where: {
				userId: id,
				createdAt: {
					gte: weekStart.toISOString()
				}
			}
		})

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { ...rest } = profile

		return {
			user: rest,
			statistics: [
				{ label: 'Total', value: totalTask },
				{ label: 'Completed tasks', value: completedTask },
				{ label: 'Today tasks', value: todayTasks },
				{ label: 'Week tasks', value: weekTasks }
			]
		}
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}

	async update(id: string, dto: UserDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		const updatedUser = await this.prisma.user.update({
			where: {
				id
			},
			data,
			select: {
				id: true,
				name: true,
				email: true,
				workInterval: true,
				breakInterval: true,
				intervalsCount: true
			}
		})

		const statistics = [
			{ label: 'Total', value: 0 },
			{ label: 'Completed tasks', value: 0 },
			{ label: 'Today tasks', value: 0 },
			{ label: 'Week tasks', value: 0 }
		]

		return {
			user: updatedUser,
			statistics
		}
	}
}
