import cn from 'clsx'
import { forwardRef, type InputHTMLAttributes } from 'react'

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TypeTransparentField>(
	({ className, ...rest }, ref) => {
	return <input 
		className={cn('bg-transparent border-none outline-none shadow-transparent w-full', className)}
		ref={ref}
		{...rest}
	/>
}
)

TransparentField.displayName = 'TransparentField'
