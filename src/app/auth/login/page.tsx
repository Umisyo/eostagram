import {SignIn} from "@clerk/nextjs";

export default function Page () {
  return <SignIn path="/login" routing="path" signUpUrl="/signup" redirectUrl="/"/>
}
