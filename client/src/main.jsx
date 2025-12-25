import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from "./Redux/store"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import App from './App.jsx'
import './styles/styles.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}><App /></QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
