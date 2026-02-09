import { Radical } from 'lucide-react'
import Link from 'next/link'
import { LogoutButton } from './LogoutButton'
import { MENU } from './menu.data'
import { MenuItem } from './MenuItem'

export function Sidebar() {
	return <aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between '>
		<div>
			<Link href={'/'} className='flex items-center gap-2.5 border-b p-4 border-b-border' >
				<Radical color='#5197ff'  size={38}/>
				<span className='text-2xl font-bold relative'>
					AR Planner
				</span>
			</Link>
			<div className="p-3 relative">
				{MENU.map(item => (
					<MenuItem key={item.name} item={item} />
				))}
				<LogoutButton />
			</div>
		</div>
		<footer className='text-sm opacity-40 font-normal pb-7 text-center p-3'>
				With Love From {' '}
				<a href="https://github.com/arionel07?tab=overview&from=2026-02-01&to=2026-02-08" 
					target='_blank'
					rel='noreferrer'
					className='hover:text-secondary font-bold text-[16px] text-[#eef6ba] transition-colors duration-100 hover:opacity-100'
				>
				Arionel</a>

		</footer>
	</aside>
}
