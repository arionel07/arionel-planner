'use client'

import { userService } from '@/service/user.service'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const {data, isLoading, isSuccess } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		retry: 1,
		staleTime: 5 * 60 * 1000
	})

	console.log('useProfile data:', data)
	
	return {data, isLoading, isSuccess}
}