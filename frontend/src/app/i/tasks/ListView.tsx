'use client'

import { DragDropContext } from '@hello-pangea/dnd'
import { COLUMNS } from './columns.data'
import { useTask } from './hooks/useTask'
import { useTaskDnd } from './hooks/useTaskDnd'
import './list-view/listRow.css'
import { ListRowParent } from './list-view/ListRowParent'


export function ListView() {

	const {items, setItems} = useTask()

	const {onDragEnd} = useTaskDnd()

	return (
	<DragDropContext onDragEnd={onDragEnd} >
		<div className="table">
			<div className="header">
				<div>Task name</div>
				<div>Due date</div>
				<div>Priority</div>
				<div></div>
			</div>

			<div className="parentsWrapper">
				{COLUMNS.map(column => (
					<ListRowParent 
						items={items}
						label={column.label}
						value={column.value}
						setItems={setItems}
						key={column.value}
					/>
				))}
			</div>
		</div>
	</DragDropContext>
	)
}
