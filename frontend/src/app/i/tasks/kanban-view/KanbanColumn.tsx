import { ITaskResponse } from '@/types/task.types'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Dispatch, SetStateAction } from 'react'
import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'
import { KanbanAddRowInput } from './KanbanAddRowInput'
import { KanbanCard } from './KanbanCard'
import './KanbanView.css'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanColumn({
	value,
	items,
	label,
	setItems
}: IKanbanColumn) {
	return (
		<Droppable droppableId={value} >
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className='column'>
						<div className='columnHeading'>
							{label}
						</div>
					

					{filterTasks(items, value)?.map((item, index) => {
							if (!item.id) {
								return (
									<KanbanCard
										key={`temp-${index}`}
										item={item}
										setItems={setItems}
									/>
								)
							}

							return (
								<Draggable
									key={item.id}
									draggableId={item.id}
									index={index}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<KanbanCard
												item={item}
												setItems={setItems}
											/>
										</div>
									)}
								</Draggable>
							)
						})}


					{provided.placeholder}

					{value !== 'completed' && !filterTasks(items, value)?.some(item => !item.id) && (
						<KanbanAddRowInput setItems={setItems} filterDate={FILTERS[value] ? FILTERS[value].format() : undefined} />
					)}
				</div>
				</div>
				)}
		</Droppable>
	)
}
