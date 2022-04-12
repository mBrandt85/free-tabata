import { ReactNode} from 'react'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import AppStateProvider from './app-state'
import UiProvider from './ui'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <UiProvider>
          <HelmetProvider>
            {children}
          </HelmetProvider>
        </UiProvider>
      </BrowserRouter>
    </AppStateProvider>
  )
}