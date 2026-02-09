import { useOutside } from '@/hooks/useOutside'
import cn from 'clsx'
import { X } from 'lucide-react'
import { Badge } from '../Badge'


export interface IOption {
	label: string,
	value: string
}

interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

export function SingleSelect({
	data,
	value,
	isColorSelect,
	onChange,
}: ISingleSelect) {
	const { isShow, setIsShow, ref} = useOutside(false)
	const getValue = () => data.find(item => item.value === value)?.value


	return (
		<div className={cn('relative min-w-36', {
			'w-max': isColorSelect
		})} ref={ref}>
			<button
				onClick={e => {
					e.preventDefault()
					setIsShow(!isShow)
				}}
			>
				{getValue() ? (
					<Badge
						variant={value as 'gray' | 'high' | 'medium' | 'low'}
						className='capitalize'
						style={isColorSelect ? {backgroundColor: value}: {}}
					>
						{getValue()}
					</Badge>
				) : (<Badge >Click here for Select</Badge>)}
			</button>
			{
				value && (
					<button className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity duration-300' onClick={(e) => {
						e.preventDefault()
						onChange('')}}>
						<X size={14} />
					</button>
				)
			}
			{isShow && (
				<div className={cn('absolute w-full p-2.5 bg-sidebar z-10 shadow rounded-lg')}
				style={{
					top: 'calc(100% + .5rem)'
				}}>
					{
						data.map(item => (
							<button key={item.value}
							onClick={(e) => {
							e.preventDefault()
							onChange(item.value)
								setIsShow(!isShow)
						}}
						className='block mb-4 last:mb-0 capitalize rounded-lg'
						style={isColorSelect ? {
							backgroundColor: item.value
						}: {}}
							>
								<Badge variant={item.value as 'gray' | 'high' | 'medium' | 'low'} >{item.value}</Badge>
							</button>
						))
					}
				</div>
			)}
		</div>
	)
}
