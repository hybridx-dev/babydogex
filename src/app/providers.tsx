'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { type State, WagmiProvider } from 'wagmi'
import { config, projectId, WOJAX_CONTRACT_ADDRESS_ERC20HX } from '../config'
import { type PropsWithChildren } from 'react'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

createWeb3Modal({
  wagmiConfig: config,
  projectId,
})

interface ProviderProps extends PropsWithChildren {
  initialState: State | undefined
}

export function Providers({ initialState, children } : ProviderProps) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}