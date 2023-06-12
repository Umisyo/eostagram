import {SignUp} from "@clerk/nextjs";

export default function Page () {
  return <SignUp path="/login" routing="path" signInUrl="/login" redirectUrl="/" />
}
