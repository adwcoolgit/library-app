import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // optional
import { Provider as ReduxProvider } from 'react-redux';
import { useState } from 'react';
import { library } from '@/app/library';
import queryClient from '@/lib/reactQuery';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => queryClient);

  return (
    <ReduxProvider store={library}>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
