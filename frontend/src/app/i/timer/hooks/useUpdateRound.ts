import { pomodoroService } from '@/service/pomodoro.service'
import { TypePomodoroRoundState } from '@/types/pomodoro.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateRound() {
	const queryClient = useQueryClient()
	
const {mutate: updateRound, isPending: IsUpdateRoundPending} = useMutation({
	mutationKey: ['update round'],
	mutationFn: ({
		id,
		data
	}: {id: string, data: TypePomodoroRoundState}) => pomodoroService.updateRound(id, data),
	onSuccess() {
		queryClient.invalidateQueries({queryKey: ['get today session']})
	}
})

	return {updateRound, IsUpdateRoundPending}
}