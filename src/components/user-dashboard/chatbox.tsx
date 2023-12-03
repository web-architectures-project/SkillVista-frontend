import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { apiRequest } from '../apis/default'
import { useDispatch, useSelector } from 'react-redux'
import { Chat, selectChatListState, setChatListState } from '@/store/chatSlilce'
import { selectUserId } from '@/store/userSlice'
import { useRouter } from 'next/router'

export interface ChatBoxProps {
  handleChatBox: () => void
  providerId: number
  providername: string
}

const ChatBox = ({ handleChatBox, providerId, providername }: ChatBoxProps) => {
  const chatlist = useSelector(selectChatListState)

  const testProvidername = 'call203'
  const testProviderId = 2
  const router = useRouter()
  // const userId = 8

  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const [message, setMessage] = useState<string>('')

  const getMessages = useCallback(() => {
    apiRequest({
      method: 'GET',
      path: '/contacts',
    }).then(res => {
      if (res?.status === 200) {
        const messages = res.message.filter(
          (item: Chat) => item.provider_id === testProviderId && item.user_id === userId,
        )
        console.log(userId)
        console.log(testProviderId)
        console.log(messages)
        dispatch(setChatListState(messages))
      }
    })
  }, [dispatch])

  useEffect(() => {
    getMessages()
  }, [getMessages])

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handlePressSend = () => {
    const chatform = {
      user_id: userId,
      provider_id: testProviderId,
      who: userId === chatlist[0].provider_id ? 'service_provider' : 'user',
      message_content: message,
      date_sent: new Date().toISOString(),
    }
    const newList: Chat[] = chatlist.concat(chatform)
    dispatch(setChatListState(newList))
    apiRequest({
      method: 'POST',
      path: '/contacts',
      body: chatform,
    }).then(res => {
      if (res?.status === 200) {
        dispatch(setChatListState(res.message))
      }
    })
  }

  useEffect(() => {
    setInterval(() => {
      getMessages()
    }, 10000)
  }, [getMessages])

  return (
    <div className="flex flex-col lg:w-2/5 lg:h-3/5 h-2/4  py-7 px-7 mx-3 fixed inset-x-0 bottom-0  z-50 bg-white rounded-xl shadow-2xl">
      <div className="flex justify-between items-stretch pb-3">
        <div className=" text-lg font-bold ">Message {providername}</div>
        <div className="self-center">
          <Image src={'/close.png'} width={18} height={18} alt="close" onClick={handleChatBox} />
        </div>
      </div>

      <hr className="bg-black" />
      <div className="overflow-y-auto pb-20 flex-grow ">
        <div className="flex flex-col px-3">
          {chatlist?.length > 0 &&
            chatlist.map((item: Chat, index: number) => {
              const conditionPotion = item.who === 'user' ? 'justify-end' : 'justify-start'
              const conditionBackground =
                item.who === 'user' ? 'bg-mainblue text-white' : 'bg-slate-300'
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
        <input
          type="text"
          placeholder="Text Message"
          value={message}
          onChange={handleMessageChange}
          className="px-3 py-3 w-full "
        />
        <Button
          className="ml-2 bg-slate-300 rounded-md text-slate-500 self-center "
          onClick={() => {
            message && handlePressSend()
          }}
        >
          Send
        </Button>
      </div>
    </div>
  )
}

ChatBox.displayName = 'ChatBox'

export { ChatBox }
