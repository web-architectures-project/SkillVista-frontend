// Import the necessary dependencies and components
import React, {
  FC,
  useState,
  Dispatch,
  FunctionComponent,
  FormEvent,
} from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

// Define the interface for the FullScreenSearchBar component's props
interface FullScreenSearchBarProps {
  query: string // The search query
  setQuery: Dispatch<React.SetStateAction<string>> // Function to update the search query
  fetchDataOnEnter: React.FormEventHandler
  queryData: object
}

// Create a functional component named FullScreenSearchBar and provide the expected props
const FullScreenSearchBar: FC<FullScreenSearchBarProps> = ({
  query,
  setQuery,
  fetchDataOnEnter,
  queryData,
}) => {
  // Function to handle input changes and update the query and focus state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value) // Update the search query
  }

  return (
    <>
      <div
        className={`pt-10 w-full ${
          queryData
            ? 'translate-y-0'
            : '2xl:translate-y-[200%] xl:translate-y-[175%]'
        } transition duration-700`}
      >
        <div className={`w-full text-center`}>
          <form onSubmit={fetchDataOnEnter}>
            <Input
              className={`px-5 ${
                queryData ? 'scale-75' : ''
              }  rounded-full transition-all py-10 text-xl sm:text-3xl duration-500 hover:shadow-md`}
              type="text"
              placeholder="Search for the service here"
              value={query}
              onChange={handleInputChange} // Attach the handleInputChange function to the input's onChange event
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default FullScreenSearchBar
