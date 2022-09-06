import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
