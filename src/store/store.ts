import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { createWrapper } from 'next-redux-wrapper'
import { userSlice } from './userSlice'
import { chatSlice } from './chatSlilce'

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      user: userSlice.reducer,
      chat: chatSlice.reducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
