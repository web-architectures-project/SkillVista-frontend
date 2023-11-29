import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { apiRequest } from '../apis/default'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectUserChatState,
  setUserChatState,
  setTheOtherUserChatState,
  selectTheOtherUserChatState,
} from '@/store/chatSlilce'
import { selectUserId } from '@/store/userSlice'

export interface ChatBoxProps {}

const ChatBox = () => {
  const userChat = useSelector(selectUserChatState)
  const theOtherUserChat = useSelector(selectTheOtherUserChatState)
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = () => {
    apiRequest({
      method: 'GET',
      path: '/contacts',
    }).then(res => {
      if (res?.status === 200) {
        setChatList(res.message)
        const userChat = res.message.filter((item: any) => {
          return item.user_id === userId
        })
        const theOtherUserChat = res.message.filter((item: any) => {
          return item.user_id !== userId
        })
        dispatch(setUserChatState(userChat))
        dispatch(setTheOtherUserChatState(theOtherUserChat))
      }
    })
  }

  const [chatList, setChatList] = useState([])

  return (
    <div className="flex flex-col lg:w-2/5 lg:h-3/5 h-2/4  py-7 px-7 mx-3 fixed inset-x-0 bottom-0  z-50 bg-white rounded-xl shadow-2xl">
      <div className="flex justify-between items-stretch pb-3">
        <div className=" text-lg font-bold ">Message Kamran</div>
        <div className="self-center">
          <Image src={'/close.png'} width={18} height={18} alt="close" />
        </div>
      </div>

      <hr className="bg-black" />
      <div className="overflow-y-auto pb-20 flex-grow ">
        <div className="flex flex-col">
          {chatList.map((item: any, index: number) => {
            const conditionPotion = item.user_id === 8 ? 'justify-end' : 'justify-start'
            const conditionBackground =
              item.user_id === 8 ? 'bg-mainblue text-white' : 'bg-slate-300'
            return (
              <div key={index} className={`py-3 flex ${conditionPotion}`}>
                <span className={`rounded-3xl  px-4 py-2 ${conditionBackground}`}>
                  {item.message_content}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="py-2 insent-x-0 bottom-0  lg:flex lg:justify-between items-stretch">
        <input type="text" placeholder="Text Message" className="px-3 py-3 w-full " />
        <Button
          className="ml-2 bg-slate-300 rounded-md text-slate-500 self-center"
          onClick={() => {}}
        >
          Send
        </Button>
      </div>
    </div>
  )
}

ChatBox.displayName = 'ChatBox'

export { ChatBox }
