'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren, useState } from 'react'

export function Providers({children}: PropsWithChildren) {
	const [client] = useState(() =>
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 60 * 1000,
					gcTime: 5 * 60 * 1000,
					refetchOnWindowFocus: false,
					refetchOnMount: false,
					refetchOnReconnect: false,
					retry: 1
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client} >
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}