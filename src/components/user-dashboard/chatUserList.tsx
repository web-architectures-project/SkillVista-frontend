import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Chat } from '@/store/chatSlilce'

interface ChatUserListProps {
  userList: Chat[]
  handleChatFromUserList: (item: Chat) => void
}

const ChatUserList = ({ userList, handleChatFromUserList }: ChatUserListProps) => {
  return (
    <div className="flex flex-col px-3 overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>UserId</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((item: Chat, index: number) => {
            const date = new Date(item?.date_sent)
            const month = date.getMonth() + 1
            const day = date.getDate()
            return (
              <TableRow key={index}>
                <TableCell>{item?.user_id}</TableCell>
                <TableCell className="text-gray-400">{item?.message_content}</TableCell>
                <TableCell>{day + '/' + month}</TableCell>
                <TableCell className="text-mainblue" onClick={() => handleChatFromUserList(item)}>
                  Chat
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

ChatUserList.displayName = 'ChatUserList'

export { ChatUserList }
