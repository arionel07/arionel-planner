import { useProfile } from '@/hooks/useProfile'
import { TypeUserForm } from '@/types/auth.types'
import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

export function useLoadData(reset: UseFormReset<TypeUserForm>) {
	const {data, isSuccess} = useProfile()

	useEffect(() => {
		if ( isSuccess && data?.user) {
			const formData = {
				email: data.user.email,
					name: data.user.name,
					breakInterval: data.user.breakInterval,
					intervalsCount: data.user.intervalsCount,
					workInterval: data.user.workInterval
			}
			reset(formData, {keepDirty: false, keepValues: false})
		}
	}, [data, isSuccess, reset])
}