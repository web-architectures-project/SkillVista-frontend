import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="grid place-items-center h-screen">
        <div className="grid gap-5">
          <Link href={"/user-login"}>
            <Button>Login as a User</Button>
          </Link>
          <Link href={"/provider-login"}>
            <Button>Login as a Provider</Button>
          </Link>{" "}
          <Link href={"/user-registration"}>
            <Button>Register as a User</Button>
          </Link>
          <Link href={"/provider-registration"}>
            <Button>Register as a Provider</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
