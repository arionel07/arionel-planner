import { pomodoroService } from '@/service/pomodoro.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateSession() {
	
	const queryClient = useQueryClient()

	const {mutate, isPending} = useMutation({
		mutationKey: ['create new session'],
		mutationFn: () => pomodoroService.CreateSession(),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get today session']
			})
		}
	})

	return {mutate, isPending}
}