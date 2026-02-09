'use client'

import { authService } from '@/service/auth.service'
import { useMutation } from '@tanstack/react-query'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
	const router = useRouter()

	const {mutate} = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return <div className="">
		<button className='ml-3 mt-8 flex cursor-pointer opacity-20 hover:opacity-100 transition-opacity duration-300' onClick={() => mutate()} >
			<LogOutIcon size={20} className='mr-2' />
			Logout
		</button>
	</div> 
}