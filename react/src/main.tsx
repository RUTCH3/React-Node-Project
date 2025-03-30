import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProducerProvider } from './context/prod.context.tsx';
import { EventProvider } from './context/event.context.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProducerProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </ProducerProvider>
    </QueryClientProvider>
  </StrictMode >
)
