import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";

interface IndexProps {}

const Index: FC<IndexProps> = ({}) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    console.log("working");
    !authContext?.isUserAuthenticated && router.push("/login");
  }, [authContext?.isUserAuthenticated, router]);
  return <div>User Dashboard</div>;
};

export default Index;
