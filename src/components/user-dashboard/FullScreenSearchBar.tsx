// Import the necessary dependencies and components
import { FC, useState, Dispatch } from "react";
import { Input } from "../ui/input";

// Define the interface for the FullScreenSearchBar component's props
interface FullScreenSearchBarProps {
  query: string; // The search query
  setQuery: Dispatch<React.SetStateAction<string>>; // Function to update the search query
}

// Create a functional component named FullScreenSearchBar and provide the expected props
const FullScreenSearchBar: FC<FullScreenSearchBarProps> = ({
  query,
  setQuery,
}) => {
  // Initialize state to manage the focus state
  const [isFocused, setIsFocused] = useState(false);

  // Function to handle input changes and update the query and focus state
  const handleInputChange = (e: any) => {
    setQuery(e.target.value); // Update the search query
    setIsFocused(true); // Set focus state to true
  };

  return (
    <>
      <div
        className={`pt-10 w-full ${
          query
            ? "translate-y-0"
            : "2xl:translate-y-[200%] xl:translate-y-[175%]"
        } transition duration-700`}
      >
        <div className={`w-full text-center`}>
          <form>
            <Input
              className={`px-5 ${
                query ? "py-5 text-xl" : "py-10 text-3xl"
              }  rounded-full transition duration-500 hover:shadow-md`}
              type="text"
              placeholder="Search for the service here"
              value={query}
              onChange={handleInputChange} // Attach the handleInputChange function to the input's onChange event
            />
          </form>
        </div>
      </div>
    </>
  );
};

// Export the FullScreenSearchBar component as the default export
export default FullScreenSearchBar;
