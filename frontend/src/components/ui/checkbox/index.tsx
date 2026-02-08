const Checkbox = (props: {
	id?: string
	extra: string
	color: 'gray' | 'cyan'
	[x: string]: any
}) => {
	const { extra, color, id, ...rest } = props
	return (
		<input
			type='checkbox'
			id={id}
			className={`defaultCheckbox relative inline-flex h-[20px] w-[20px] min-h-[20px] min-w-[20px] appearance-none items-center justify-center rounded-md border border-gray-300 text-white/0 outline-none transition ease-linear checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 ${color === 'gray' ? 'checked:border-none checked:bg-gray-500' : color === 'cyan' ? 'checked:border-none checked:bg-cyan-300' : 'border:none checked:bg-amber-300'}${extra}`}
			name='weekly'
			{...rest}
		/>
	)
}
