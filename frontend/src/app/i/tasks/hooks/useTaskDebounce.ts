import { TypeTaskFormState } from '@/types/task.types'
import debounce from 'lodash.debounce'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'
import { useCreateTask } from './useCreateTask'
import { useUpdateTask } from './useUpdateTask'

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskFormState>
	itemId: string,
	setItems?: Dispatch<SetStateAction<any[] | undefined>>
}

export function useTaskDebounce({watch, itemId}: IUseTaskDebounce) {

	const {updateTask} = useUpdateTask()
	const {createTask} = useCreateTask()

	const debounceCreatedTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			createTask(formData)
		}, 444),
		[]
	)

		const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			updateTask({id: itemId, data: formData})
		}, 444),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if(itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				}) 
			} else {
				debounceCreatedTask(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debounceUpdateTask, debounceCreatedTask])

}
