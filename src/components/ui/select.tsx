import React from 'react'
import { cn } from '@/lib/utils'

export interface listProps {
  service_category_id: number
  service_name: string
  description: string
}
interface selectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  lists?: listProps[]
}
const SelectBox = React.forwardRef<HTMLSelectElement, selectBoxProps>(
  ({ className, lists, ...props }, ref) => {
    return (
      <div>
        <select
          name="serviceType"
          id="serviceType"
          ref={ref}
          {...props}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        >
          {lists &&
            lists.map((list: listProps, index: number) => {
              return <option key={index}>{list?.service_name}</option>
            })}
        </select>
      </div>
    )
  },
)
SelectBox.displayName = 'SelectBox'
export { SelectBox }
