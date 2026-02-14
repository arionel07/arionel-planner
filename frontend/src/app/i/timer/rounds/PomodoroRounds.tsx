'use client'

import { IPomodoroRoundsResponse } from '@/types/pomodoro.types'
import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './pomooroRound.css'

interface IPomodoroRounds {
	rounds: IPomodoroRoundsResponse[] | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	activeRound: IPomodoroRoundsResponse | undefined

}

export function PomodoroRounds({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound
}: IPomodoroRounds) {
	const isCanPrevRound = rounds ? rounds.some(round => round.isCompleted) : false
	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

	return (
		<div className="container">
			<button className='button' disabled={!isCanPrevRound} onClick={() => {isCanPrevRound ? prevRoundHandler() : false}}> <ChevronLeft size={23} /> </button>
			<div className="roundsContainer">
				{rounds && 
					rounds.map((round, index) => (
						<div className={cn('round', {
							completed: round.isCompleted,
							active: round.id === activeRound?.id && !round.isCompleted
						})} key={index} />
					))
				}
			</div>
			<button className='button' disabled={!isCanNextRound} onClick={() => {isCanNextRound ? nextRoundHandler() : false}}> <ChevronRight size={23} /> </button>
		</div>
	)
}
