import { EnumTaskPriority, ITaskResponse } from '@/types/task.types'
import { Dispatch, SetStateAction } from 'react'
import './KanbanView.css'

interface IKanbanAddRowInput {
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
	filterDate?: string 
}

export function KanbanAddRowInput({setItems, filterDate}: IKanbanAddRowInput) {
	const addCard = () => {
		setItems(prev => {
			
			if (!prev) return 

			return [ 
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate,
					priority: EnumTaskPriority.medium
				} as ITaskResponse
			]
		})
	}
	

	return (
		<div className="mt-5">
			<button
				onClick={addCard}
				className='italic opacity-40 text-sm cursor-pointer'
			>
				Add task...
			</button>
		</div>
	)
}
