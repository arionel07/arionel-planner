import { taskService } from '@/service/task.service'
import { ITaskResponse } from '@/types/task.types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useTask() {
	const {data} = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTask()
	})	

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data) 

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return {items, setItems}
}