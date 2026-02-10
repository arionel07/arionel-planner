import { ITaskResponse } from '@/types/task.types'
import { Dispatch, SetStateAction } from 'react'
import './listRow.css'

interface IListAddRowInput {
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
	filterDate?: string 
}

export function ListAddRowInput({setItems, filterDate}: IListAddRowInput) {
	const addRow = () => {
		setItems((prev) => {
			if (!prev) return

			return [ 
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}
	

	return (
		<div className="addRow">
			<button
				onClick={addRow}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
	)
}
