'use client'

import { useProfile } from '@/hooks/useProfile'
import { GlobalLoader } from './GlobalLoader'
import { Profile } from './profile/Profile'

export function Header() {
	const {data, isLoading} = useProfile()

	return <header>
	
		<div>
		<GlobalLoader />
		<Profile  />
		</div>
	</header>
}
