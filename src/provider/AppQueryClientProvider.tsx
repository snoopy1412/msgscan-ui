'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AppQueryClientProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000
          }
        }
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default AppQueryClientProvider;
