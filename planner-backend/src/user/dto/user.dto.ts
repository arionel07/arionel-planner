import { Type } from 'class-transformer'
import {
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class PomodoroSettingsDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	@Min(1)
	workInterval?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	@Min(1)
	breakInterval?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	@Min(1)
	@Max(10)
	intervalsCount?: number
}
export class UserDto extends PomodoroSettingsDto {
	@IsEmail()
	@IsOptional()
	email?: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 character long'
	})
	@IsString()
	password?: string
}
