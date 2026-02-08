import { IBase } from './root.types'

export interface IPomodoroRoundsResponse extends IBase {
	isCompleted?: boolean
	totalSeconds: number
}
export interface IPomodoroSessionResponse extends IBase {
	isCompleted?: boolean
	rounds?: IPomodoroRoundsResponse[]
}

export type TypePomodoroRoundState = Partial<Omit<IPomodoroRoundsResponse, 'id' | 'createdAt' | 'updatedAt' >>

export type TypePomodoroSessionState = Partial<Omit<IPomodoroSessionResponse, 'id' | 'createdAt' | 'updatedAt' >>