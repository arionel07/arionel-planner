'use client'

import { DragDropContext } from '@hello-pangea/dnd'
import { COLUMNS } from '../columns.data'
import { useTask } from '../hooks/useTask'
import { useTaskDnd } from '../hooks/useTaskDnd'
import { KanbanColumn } from './KanbanColumn'
import './KanbanView.css'


export function KanbanView() {

	const {items, setItems} = useTask()

	const {onDragEnd} = useTaskDnd(items ?? [])

	return (
	<DragDropContext onDragEnd={onDragEnd} >
		<div className="board">
			{COLUMNS.map(column => (
					<KanbanColumn 
						items={items}
						label={column.label}
						value={column.value}
						setItems={setItems}
						key={column.value}
					/>
				))}
		</div>
	</DragDropContext>
	)
}
