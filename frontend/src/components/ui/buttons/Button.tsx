import cn from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,className,...rest
}: PropsWithChildren<TypeButton>) {
	return <button className={cn(
		'linear cursor-pointer rounded-lg bg-transparent border border-primary py-2 px-7 text-base font-medium text-white transition hover:bg-primary active:bg-blue-500 ',className
	)}
	{...rest}
	>
		{children}
	</button>
}
