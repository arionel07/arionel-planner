import { taskService } from '@/service/task.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDelete() {
	const queryClient = useQueryClient()

const {mutate: deleteTask, isPending: isDeletingPending} = useMutation({
		mutationKey: ['create task'],
		mutationFn: (id: string) => taskService.deleteTask(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})
	return {deleteTask, isDeletingPending}
}