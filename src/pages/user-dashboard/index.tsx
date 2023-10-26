// Import the necessary dependencies and components
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/user-dashboard/DataTable";
import FullScreenSearchBar from "@/components/user-dashboard/FullScreenSearchBar";
import { columns } from "@/components/user-dashboard/columns";
import { DummyData } from "@/lib/utils/UserDashboardData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useEffect, useState } from "react";

// Define the interface for the props (currently empty)
interface IndexProps {}

const Index: FC<IndexProps> = async ({}) => {
  // Initialize state to manage the search query
  const [query, setQuery] = useState("");
  // const router = useRouter();
  // const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(query);
    (async () => {
      const services = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}services`
      );
      const { data, status } = services;
      console.log(data);
    })();
  }, [query]);

  // const searchServices = async () => {};
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["search-result"],
  //   queryFn: searchServices,
  // });

  // useEffect to check user authentication and redirect if not authenticated
  // useEffect(() => {
  //   !authContext?.isUserAuthenticated && router.push("/user-login");
  // }, [authContext?.isUserAuthenticated, router]);

  return (
    // Main container for the component
    <main className="container">
      <div className="relative h-screen">
        <div>
          {/* Render the FullScreenSearchBar component and pass the query state and setQuery function as props */}
          <FullScreenSearchBar query={query} setQuery={setQuery} />
          {/* <Button type="submit" title="Submit" onClick={searchServices}>
            Submit
          </Button> */}

          {/* Render the DataTable component, passing columns, data, and the search query as props */}
          <DataTable columns={columns} data={DummyData} query={query} />
        </div>
      </div>
    </main>
  );
};

// Export the Index component as the default export
export default Index;
