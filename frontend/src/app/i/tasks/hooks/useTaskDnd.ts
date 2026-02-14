import { ITaskResponse } from '@/types/task.types'
import { DropResult } from '@hello-pangea/dnd'
import { FILTERS } from '../columns.data'
import { useUpdateTask } from './useUpdateTask'
export function useTaskDnd(items: ITaskResponse[]) {
	const {updateTask} = useUpdateTask()
	
	const onDragEnd = (result: DropResult) => {
		if (!result.destination || !items) return

		const destinationColumnId = result.destination.droppableId

		if (destinationColumnId === result.source.droppableId) return

		const item = items.find(i => i.id === result.draggableId)
		if(!item) return

		if (destinationColumnId === 'completed') {
			updateTask({
				id: item.id,
				data: {
					...item,
					isCompleted: true
				}
			})

			return
		}

		const newCreatedAt = FILTERS[destinationColumnId].format()

		updateTask({
			id: item.id,
			data: {
				...item,
				createdAt: newCreatedAt,
				isCompleted: destinationColumnId === 'completed' ? true : false
			}
		})

	}


	return {onDragEnd}
}