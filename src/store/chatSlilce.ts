import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Chat {
  contact_id?: number
  user_id: number
  provider_id: number
  who: string
  message_content: string
  date_sent: string | Date
}
interface ChatList {
  chatlist: Chat[]
}

const initialState: ChatList = {
  chatlist: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatListState(state = initialState, action: PayloadAction<Chat[]>) {
      state.chatlist = action.payload
    },
  },
})

export const { setChatListState } = chatSlice.actions

export const selectChatListState = (state: AppState) => state.chat.chatlist

export const chatReducer = chatSlice.reducer
