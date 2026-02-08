import { forwardRef } from 'react'

interface InputFieldProps {
	id: string
	label: string
	extra?: string
	placeholder: string
	variant?: string
	state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			label,
			id,
			extra,
			type = 'text',
			placeholder,
			state,
			disabled,
			isNumber,
			...rest
		},
		ref
	) => {
		return (
			<div className={`${extra}`}>
				<label htmlFor={id} className={'text-medium font-medium text-white/60dark: text-white ml-1.5'}>{label}</label>

				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder}
					className={`mt-2 w-full rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal transition-colors duration-500 focus:border-primary
						${
							disabled
								? '!border-none !bg-gray dark:!bg-white/5 dark:placeholder:!text-gray'
								: state === 'error'
								? 'border-red-500 text-red-500 placeholder:text-red-400 dark:border-red-400 dark:text-red-400 dark:placeholder:text-red-500'
								: state === 'success'
								? 'border-green-500 text-green-500 placeholder:text-green-500 dark:border-green-400 dark:text-green-400 dark:placeholder:text-green-400'
								: ''
						}`}
					onKeyDown={(event) => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							!['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)
						) {
							event.preventDefault()
						}
					}}
					{...rest}
				/>
			</div>
		)
	}
)

Field.displayName = 'field'
