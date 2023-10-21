// import { AuthContext } from "@/context/auth-context";
// import { useRouter } from "next/router";
import { DataTable } from "@/components/user-dashboard/DataTable";
import FullScreenSearchBar from "@/components/user-dashboard/FullScreenSearchBar";
import { columns } from "@/components/user-dashboard/columns";
import { DummyData } from "@/lib/utils/UserDashboardData";
import { FC, useState } from "react";

interface IndexProps {}

const Index: FC<IndexProps> = ({}) => {
  const [query, setQuery] = useState("");
  // const router = useRouter();
  // const authContext = useContext(AuthContext);
  // useEffect(() => {
  //   console.log("working");
  //   !authContext?.isUserAuthenticated && router.push("/user-login");
  // }, [authContext?.isUserAuthenticated, router]);
  return (
    <main className="container">
      <div className="relative h-screen">
        <div>
          <FullScreenSearchBar query={query} setQuery={setQuery} />
          <DataTable columns={columns} data={DummyData} query={query} />
        </div>
      </div>
    </main>
  );
};

export default Index;
