import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

interface User {
  username?: string
  first_name: string
  last_name: string
  phone_number: string
  address: string
  city: string
  county: string
  Eircode: string
  profile_picture_url: string
  bio: string
}

export interface UserState {
  user: User
  username: string
  profileId: number
  userId: number
  userType: string
}

const initialState: UserState = {
  user: {
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    city: '',
    county: '',
    Eircode: '',
    profile_picture_url: '',
    bio: '',
  },
  username: '',
  profileId: 0,
  userId: 0,
  userType: 'user',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state = initialState, action: PayloadAction<User>) {
      state.user = action.payload
    },
    setUserName(state = initialState, action: PayloadAction<string>) {
      state.username = action.payload
    },
    setProfileId(state = initialState, action: PayloadAction<number>) {
      state.profileId = action.payload
    },
    setUserId(state = initialState, action: PayloadAction<number>) {
      state.userId = action.payload
    },
    setUserType(state = initialState, action: PayloadAction<string>) {
      state.userType = action.payload
    },
  },
})

export const { setUserState, setUserName, setProfileId, setUserId, setUserType } = userSlice.actions

export const selectUserState = (state: AppState) => state.user?.user
export const selectUserName = (state: AppState) => state.user?.username
export const selectProfileId = (state: AppState) => state.user?.profileId
export const selectUserId = (state: AppState) => state.user?.userId
export const selectUserType = (state: AppState) => state.user?.userType

export const userReducer = userSlice.reducer
