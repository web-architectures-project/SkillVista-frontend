import { FC, useState, Dispatch } from "react";
import { Input } from "../ui/input";

interface FullScreenSearchBarProps {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
}

const FullScreenSearchBar: FC<FullScreenSearchBarProps> = ({
  query,
  setQuery,
}) => {
  const [enterPressed, setEnterPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
    setIsFocused(true);
  };

  // const submitHandler = () => {
  //   setEnterPressed(!enterPressed);
  // };
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center -translate-y-24 w-full z-10">
        <div className={`w-full text-center`}>
          <form>
            <Input
              className={` ${
                query ? "-translate-y-72 py-8 text-xl" : "py-12 text-3xl"
              } px-5  rounded-full  transition duration-500 transform-gpu hover:shadow-md`}
              type="text"
              placeholder="Search for the service here"
              value={query}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default FullScreenSearchBar;
