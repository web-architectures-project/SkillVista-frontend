import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
  user: string[]
  the_other_user: string[]
}

const initialState: ChatState = {
  user: [],
  the_other_user: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserChatState(state = initialState, action: PayloadAction<string[]>) {
      state.user = action.payload
    },
    setTheOtherUserChatState(state = initialState, action: PayloadAction<string[]>) {
      state.the_other_user = action.payload
    },
  },
})

export const { setUserChatState, setTheOtherUserChatState } = chatSlice.actions

export const selectUserChatState = (state: AppState) => state.chat.user
export const selectTheOtherUserChatState = (state: AppState) => state.chat.the_other_user

export const chatReducer = chatSlice.reducer
