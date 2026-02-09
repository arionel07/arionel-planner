'use client'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import Loader from '@/components/ui/Loader'
import { useProfile } from '@/hooks/useProfile'
import { TypeUserForm } from '@/types/auth.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoadData } from './hooks/useLoadData'
import { useUpdateSettings } from './hooks/useUpdateSettings'

export function Settings() {
	const {isLoading} = useProfile()
	const { register, handleSubmit, reset, formState: { isDirty } } = useForm<TypeUserForm>({
		 mode: 'onChange'
	})
	
	useLoadData(reset)
	const {isPending, mutate} = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = formData => {
		const {password, ...rest} = formData
	
		const updateData = {
			...rest,
			...(password && password.trim() !== '' ? { password } : {})
		}
		
		mutate(updateData)
	}

	return <div>
		<form className='w-2/4' onSubmit={handleSubmit(onSubmit)}>
			<div className="grid grid-cols-2 gap-10">
				{isLoading ? <Loader /> : (
					<>
					<div>
						<Field 
							id='email' 
							label='Email: ' 
							placeholder='Enter email: ' 
							type='email' 
							{...register('email', { required: 'Email is required!' })} 
							extra='mb-4'
						/>
						<Field 
							id='name' 
							label='Name: ' 
							placeholder='Enter name: ' 
							extra='mb-4' 
							{...register('name')}
						/>
						<Field 
							id='password' 
							label='Password: ' 
							placeholder='Enter password: ' 
							type='password' 
							extra='mb-10' 
							{...register('password')}
						/>
					</div>
					<div>
						<Field 
							id='workInterval' 
							label='WorkInterval (min.): ' 
							placeholder='Enter work interval (min.): ' 
							extra='mb-4' 
							isNumber 
							{...register('workInterval', { valueAsNumber: true })}
						/>
						<Field 
							id='breakInterval' 
							label='BreakInterval (min.): ' 
							placeholder='Enter break interval (min.): ' 
							extra='mb-4' 
							isNumber 
							{...register('breakInterval', { valueAsNumber: true })}
						/>
						<Field 
							id='intervalsCount' 
							label='IntervalsCount (max 10): ' 
							placeholder='Enter interval count (max 10): ' 
							extra='mb-6' 
							isNumber 
							{...register('intervalsCount', { valueAsNumber: true })}
						/>
					</div>
					</>
				)}
			</div>

			<Button type={'submit'} disabled={isPending || !isDirty}>{isPending ? 'Saving...' : 'Save'}</Button>
		</form>
	</div>
}
 