import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext?.isUserAuthenticated ? router.push('/')
  }, []);
  return <div>User Dashboard</div>;
};

export default index;
