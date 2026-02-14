import { IPomodoroRoundsResponse } from '@/types/pomodoro.types'
import { Dispatch, SetStateAction } from 'react'

export interface ITimerState {
	isRunning: boolean
	activeRound: IPomodoroRoundsResponse | undefined
	secondsLeft: number
	setIsRunning:	Dispatch<SetStateAction<boolean>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundsResponse | undefined>>
}