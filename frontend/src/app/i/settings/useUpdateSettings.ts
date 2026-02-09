'use client'
import { userService } from '@/service/user.service'
import { TypeUserForm } from '@/types/auth.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateSettings() {
	const queryClient = useQueryClient()
	
	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => 
			 userService.update(data),
		onSuccess(response) {
			toast.success('Profile was successfully updated!')
			queryClient.setQueryData(['profile'], response)
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
		onError(error: any) {
			toast.error(error?.response?.data?.message || 'Failed to update profile')
		}
	})

	return {mutate, isPending}
}