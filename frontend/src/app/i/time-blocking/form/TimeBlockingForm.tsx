'use client'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { TypeTimeBlockFormState } from '@/types/time-block.types'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useFormContext, useWatch } from 'react-hook-form'
import { COLORS } from './colors.data'
import { useCreateTimeBlock } from './hook/useCreateTimeBlock'
import { useUpdateTimeBlock } from './hook/useUpdateTimeBlock'

export function TimeBlockingForm() {
	const {register,control, reset,getValues, handleSubmit} = useFormContext<TypeTimeBlockFormState>()
	const existsId = useWatch({control, name: 'id'})

	const {updateTimeBlock} = useUpdateTimeBlock(existsId)
	const {createTimeBlock, isPending} = useCreateTimeBlock()

	const defaultFormValues: TypeTimeBlockFormState = {
		color: COLORS[COLORS.length - 1],
    duration: 0,
    name: '',
    id: undefined,
    order: 1
	}

		
	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updateTimeBlock({
				id,
				data: dto
			},{
				onSuccess:() => reset({...defaultFormValues})
			})
		} else {
			createTimeBlock(dto, {
				onSuccess:() => reset({...defaultFormValues})
			})
		}

		useEffect(() => {
			reset({
				...defaultFormValues
			})
		}, [data])
	}


	return <form
		className='w-3/5'
		onSubmit={handleSubmit(onSubmit)}
	>
		
	<Field
				{...register('name', {
					required: true
				})}
				id='name'
				label='Enter name:'
				placeholder='Enter name:'
				extra='mb-4'
			/>

			<Field
				{...register('duration', {
					required: true,
					valueAsNumber: true
				})}
				id='duration'
				label='Enter duration (min.):'
				placeholder='Enter duration (min.):'
				isNumber
				extra='mb-4'
			/>

	<div>
		<span className='inline-block mb-2'>Color:</span>
		<Controller
			control={control}
			name='color'
			render={({ field: {value, onChange}}) => (
				<SingleSelect 
					data={COLORS.map(item => ({
						value: item,
						label: item
					}))}
					onChange={onChange}
					value={value || COLORS[COLORS.length - 1]}
					isColorSelect
				/>
			)}
		/>
	</div>

	<Button 
		type='submit'
		disabled={isPending}
		className='mt-6'
	>
		{existsId ? 'Update' : 'Create'}
	</Button>
	</form>
}
