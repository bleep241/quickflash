"use client"

import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

// this component will cache api calls so if we make the same API calls in different components, it will just take from the cache

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default Providers