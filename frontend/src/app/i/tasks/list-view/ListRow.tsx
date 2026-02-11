import Checkbox from '@/components/ui/checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import Loader from '@/components/ui/Loader'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'
import cn from 'clsx'
import { GripVertical, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDelete } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'
import './listRow.css'

interface IListRow {
	item: ITaskResponse,
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRow({item, setItems}: IListRow) {

	const {register, control, watch} = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({watch, itemId: item.id})

	const {deleteTask, isDeletingPending} = useDelete()

	return <div
		className={cn(
			'row',
			watch('isCompleted') ? 'completed' : '',
			'animation-opacity'
		)}
	>
		<div>
			<span className='inline-flex items-center gap-2.5 w-full'>
				<button aria-describedby='todo-item'>
					<GripVertical className='grip' />
				</button>

				<Controller 
					control={control}
					name='isCompleted'
					render={({ field: {value, onChange}}) => (
						<Checkbox onChange={onChange} checked={value} extra='' color={'cyan'} />
					)}
				/>

				<TransparentField {...register('name')} />
			</span>
		</div>
		<div>
			<Controller control={control} name='createdAt' render={({ field: {value, onChange}}) => (
				<DatePicker onChange={onChange} value={value || ''} />
			)} />
		</div>
		<div>
			<Controller control={control} name='priority' render={({ field: {value, onChange}}) => (
				<SingleSelect data={['high', 'medium', 'low'].map(item => ({
					value: item,
					label: item
				}))} onChange={onChange} value={value || ''} />
			)} />
		</div>
		<div>
			<button
				onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}
				className='opacity-50 transition-opacity duration-200 hover:opacity-100'
			>
				{isDeletingPending ? <Loader /> : <Trash size={17} />}
			</button>
		</div>
	</div>
}
