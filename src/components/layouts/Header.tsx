'use client'

import {UserButton, useUser} from "@clerk/nextjs";

export function Header() {
  const {isSignedIn} = useUser();
  return (

    <ul className="w-full">
      {isSignedIn ?
        (<li>
          <UserButton/>
        </li>)
        :
        (<>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
        </>)
      }
    </ul>
  )
}