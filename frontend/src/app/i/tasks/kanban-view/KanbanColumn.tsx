import { ITaskResponse } from '@/types/task.types'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Dispatch, SetStateAction } from 'react'
import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'
import { ListAddRowInput } from './ListAddRowInput'
import { ListRow } from './ListRow'
import './listRow.css'

interface IListLowParent {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRowParent({
	value,
	items,
	label,
	setItems
}: IListLowParent) {
	return (
		<Droppable droppableId={value} >
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className='colHeading'>
						<div className='w-full'>
							{label}
						</div>
					</div>

					{filterTasks(items, value)?.map((item, index) => {
							if (!item.id) {
								return (
									<ListRow
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
											<ListRow
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
						<ListAddRowInput setItems={setItems} filterDate={FILTERS[value] ? FILTERS[value].format() : undefined} />
					)}

				</div>
				)}
		</Droppable>
	)
}
