'use client'

import { pomodoroService } from '@/service/pomodoro.service'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ITimerState } from '../timer.types'
import { useLoadSettings } from './useLoadSettings'



export function useTodaySession({setActiveRound, setSecondsLeft}: ITimerState) {
	const {
	data: sessionResponse,
	isLoading,
	refetch,
	isSuccess
} = useQuery({
	queryKey: ['get today session'],
	queryFn: () => pomodoroService.getTodaySession()
})
const {workInterval} = useLoadSettings()

	const rounds = sessionResponse?.data.rounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(rounds => !rounds.isCompleted) 
			setActiveRound(activeRound)
		
			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds])

	return {sessionResponse, isLoading, refetch, isSuccess, workInterval}
}