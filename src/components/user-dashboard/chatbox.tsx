import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { apiRequest } from '../apis/default'
import { useDispatch, useSelector } from 'react-redux'
import { Chat, selectChatListState, setChatListState } from '@/store/chatSlilce'
import { selectUserId, selectUserType } from '@/store/userSlice'
import { ChatUserList } from './chatUserList'
import { TUserDashboardTable } from './columns'

export interface ChatBoxProps {
  handleChatBox: () => void
  contactInfo?: TUserDashboardTable
}

const ChatBox = ({ handleChatBox, contactInfo }: ChatBoxProps) => {
  const chatlist = useSelector(selectChatListState)
  const userType = useSelector(selectUserType)

  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const [message, setMessage] = useState<string>('')
  const [userList, setUserList] = useState<Chat[]>([])
  const [userIdFromList, setUserIdFromList] = useState<number>(0)
  const [userListTable, setUserListTable] = useState(userType === 'service_provider' ? true : false)

  const getMessages = useCallback(() => {
    apiRequest({
      method: 'GET',
      path: '/contacts',
    }).then(res => {
      if (res?.status === 200) {
        const messages = res.message.filter((item: Chat) =>
          userType === 'user'
            ? Number(item.provider_id) === Number(contactInfo?.provider_id) &&
              Number(item.user_id) === userId
            : Number(item.provider_id) === userId,
        )

        dispatch(setChatListState(messages))
        if (userType === 'service_provider') {
          const reverseArray = res.message.reverse()
          const tempArray: Chat[] = []
          reverseArray.forEach((item: Chat) => {
            const check_exist = tempArray.filter(item2 => item2.user_id === item.user_id)
            if (check_exist.length === 0) {
              tempArray.push(item)
            }
          })
          setUserList(tempArray)
        }
      }
    })
  }, [dispatch, contactInfo?.provider_id, userId, userType])

  useEffect(() => {
    getMessages()
  }, [getMessages, contactInfo?.provider_id])

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handlePressSend = () => {
    const chatform = {
      user_id: userType === 'user' ? userId : userIdFromList,
      provider_id: Number(contactInfo?.provider_id),
      who: userType,
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
    setMessage('')
  }

  const handleChatFromUserList = (info: Chat) => {
    setUserIdFromList(info.user_id)
    const messages = chatlist.filter(
      (item: Chat) => item.provider_id === userId && item.user_id === info.user_id,
    )

    dispatch(setChatListState(messages))
    handleUserListTable()
  }

  const handleUserListTable = () => {
    setUserListTable(!userListTable)
  }

  return (
    <div className="flex flex-col lg:w-2/5 lg:h-3/5 h-2/4  py-7 px-7 mx-3 fixed inset-x-0 bottom-0  z-50 bg-white rounded-xl shadow-2xl">
      <div className="flex justify-between items-stretch pb-3">
        <div className=" text-lg font-bold ">Message</div>
        <div className="self-center">
          <Image src={'/close.png'} width={18} height={18} alt="close" onClick={handleChatBox} />
        </div>
      </div>

      <hr className="bg-black" />
      {userListTable && (
        <ChatUserList userList={userList} handleChatFromUserList={handleChatFromUserList} />
      )}
      {!userListTable && (
        <>
          <div className="overflow-y-auto pb-20 flex-grow ">
            <div className="flex flex-col px-3">
              {chatlist?.length > 0 &&
                chatlist.map((item: Chat, index: number) => {
                  const conditionPotion =
                    userType === 'user'
                      ? item.who === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                      : item.who === 'user'
                      ? 'justify-start'
                      : 'justify-end'
                  const conditionBackground =
                    userType === 'user'
                      ? item.who === 'user'
                        ? 'bg-mainblue text-white'
                        : 'bg-slate-300'
                      : item.who === 'user'
                      ? 'bg-slate-300'
                      : 'bg-mainblue text-white'

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
        </>
      )}
    </div>
  )
}

ChatBox.displayName = 'ChatBox'

export { ChatBox }
