import React from "react";
import { auth, signIn, signOut } from "../lib/nextauth";

export default async function page() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Signout</button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button type="submit">Signin</button>
        </form>
      )}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
