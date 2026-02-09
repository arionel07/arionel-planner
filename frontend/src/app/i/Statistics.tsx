'use client'

import Loader from '@/components/ui/Loader'
import { useProfile } from '@/hooks/useProfile'

export function Statistics() {
	const { data, isLoading } = useProfile()


	return isLoading ? <Loader /> : (
		<div className="relative grid mt-7 grid-cols-4 gap-12">
			{data?.statistics.length ? data.statistics.map(text => (
				<div key={text.label} className="m-4 p-5 bg-border/20  text-center  transition-transform duration-500 hover:-translate-y-3 rounded-lg">
					<div className="text-xl">{text.label}</div>
					<div className="text-3xl">{text.value}</div>
				</div>
			)) : <div className="absolute left-[40%] mt-10 text-3xl text-white">Statistics Not loaded!</div>}
		</div>
	)
}
