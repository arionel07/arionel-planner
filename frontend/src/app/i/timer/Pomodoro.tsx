'use client'

import { Button } from '@/components/ui/buttons/Button'
import Loader from '@/components/ui/Loader'
import { Pause, Play, RefreshCcw } from 'lucide-react'
import { formatTime } from './format-time'
import { useCreateSession } from './hooks/useCreateSession'
import { useDeleteSession } from './hooks/useDeleteSession'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'
import { PomodoroRounds } from './rounds/PomodoroRounds'

export function Pomodoro() {
	const timerState = useTimer()
	const {isLoading, sessionResponse, workInterval} = useTodaySession(timerState)

	const {isPending, mutate} = useCreateSession()

	const rounds = sessionResponse?.data.rounds
	const actions = useTimerActions({...timerState, rounds})

	const {deleteSession, isDeletePending} = useDeleteSession(() => timerState.setSecondsLeft(workInterval * 60))

	return <div className='relative w-80 text-center mt-6 ml-6'>
		{!isLoading && (
			<div className="text-7xl font-semibold ">{formatTime(timerState.secondsLeft)}</div>
		) }
		{isLoading ? <Loader /> : sessionResponse?.data ? (
			<>
				<PomodoroRounds rounds={rounds} nextRoundHandler={actions.nextRoundHandler} prevRoundHandler={actions.prevRoundHandler} activeRound={timerState.activeRound} />
				<button
					className='mt-6 opacity-80 hover:opacity-100 transition-opacity duration-300'
					onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
					disabled={actions.IsUpdateRoundPending}
				>
					{timerState.isRunning ? <Pause size={30} /> : <Play size={30} /> }
				</button>
				<button
				className='absolute right-0 top-0 opacity-40 hover:opacity-100 transition-opacity duration-300'
				disabled={isDeletePending}
				onClick={() => {
					timerState.setIsRunning(false)
					deleteSession(sessionResponse.data.id)
				}}
				>
					<RefreshCcw size={19} />
				</button>
			</>
		) : (
			<Button
				className='mt-5'
				disabled={isPending}
				onClick={() => mutate()}
			>
				Create Session
			</Button>
		)}
	</div>
}
