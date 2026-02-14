'use client'

import type { IPomodoroRoundsResponse } from '@/types/pomodoro.types'
import { useEffect, useState } from 'react'
import type { ITimerState } from '../timer.types'
import { useLoadSettings } from './useLoadSettings'

export function useTimer():ITimerState {
	const {workInterval, breakInterval} = useLoadSettings()
	
	const [isRunning, setIsRunning] = useState(false)
	const [isBreak, setIsBreak] = useState(false)

	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
	const [activeRound, setActiveRound] = useState<IPomodoroRoundsResponse>()


	useEffect(() => {

		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1)
			}, 1000)
		} else if(!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft, workInterval, activeRound])

	useEffect(() => {
		if (secondsLeft > 0) return

		setIsBreak(!isBreak)
		setSecondsLeft((isBreak ? workInterval : breakInterval) * 60)
	}, [secondsLeft, isBreak, workInterval, breakInterval])

	return {activeRound, secondsLeft, setSecondsLeft, setActiveRound, setIsRunning, isRunning }
}