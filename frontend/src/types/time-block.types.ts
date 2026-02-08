import { IBase } from './root.types'

export interface ITimeBlockResponse extends IBase{
	color?: string
	name: string
	duration: number
	order: number
}

export type TypeTimeBlockFormState = Partial<
	Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>
>
