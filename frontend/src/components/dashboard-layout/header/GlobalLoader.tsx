'use client'
import Loader from '@/components/ui/Loader'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

export function GlobalLoader() {

	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	return isFetching || isMutating ? (
		<div className="fixed top-9 right-9 z-50">
			<Loader />
		</div>
	) : null
}
