import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import reportWebVitals from './reportWebVitals'

import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import { RecoilRoot } from 'recoil'
import { AlertContextProvider } from '@contexts/AlertContext'

const client = new QueryClient({
  defaultOptions: {
    // 실패하면, 바로 실패하게 리트라이 0
    queries: {
      retry: 0,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
