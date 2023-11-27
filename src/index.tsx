import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { chartSlice } from './store/chart/slice'
import { regionsSlice } from './store/regions/slice'
import App from './App'
import './index.css'

export const store = configureStore({
  reducer: {
    regions: regionsSlice.reducer,
    chart: chartSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
