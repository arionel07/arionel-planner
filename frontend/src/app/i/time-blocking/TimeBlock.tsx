'use client'

import { ITimeBlockResponse } from '@/types/time-block.types'
import { GripVertical, Loader2, SquarePen, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { TypeTimeBlockFormState } from '../../../types/time-block.types'
import { useDeleteTimeBlock } from './hooks/useDeleteTimeBlock'
import { useTimeBlockSortable } from './hooks/useTimeBlockSortable'
import './time-blocking.css'

export function TimeBlock({item}: {item:ITimeBlockResponse}) {

	const {attributes, listeners, setNodeRef, style} = useTimeBlockSortable(item.id)

	const {reset} = useFormContext<TypeTimeBlockFormState>()
	const {deleteTimeBlock, isDeletePending} = useDeleteTimeBlock(item.id)

	return <div
		ref={setNodeRef}
		style={style}
>
		<div className="block"
			style={{
				backgroundColor: item.color || 'lightslategrey',
				height: `${item.duration}px`
			}}
		>
			<div className="flex items-center">
				<button
				{...attributes}
				{...listeners}
				aria-describedby='time-block'
				>
					<GripVertical className='grip' />
				</button>
				<div>
					{item.name}{' '}
					<i className='text-sm opacity-55'>({item.duration} min.)</i>
				</div>
			</div>
			
			<div className="actions">
				<button
				onClick={() => {
					reset({
						id: item.id,
						color: item.color,
						duration: item.duration,
						name: item.name,
						order: item.order
					})
				}}
				className='mr-3 opacity-50 duration-300 hover:opacity-100 transition-opacity'
				>
					<SquarePen size={17} />
				</button>
				<button onClick={() => deleteTimeBlock()} className='opacity-50 duration-300 hover:opacity-100 transition-opacity' >
					{isDeletePending ? <Loader2 size={17} /> : <Trash2 size={17} />}
				</button>
			</div>
		</div>
	</div>
}
