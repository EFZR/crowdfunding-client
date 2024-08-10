import { cookies } from "next/headers";
import { getServerSideUser } from "../lib";
import SignoutButton from "../components/ui/SignoutButton/SignoutButton";

export default async function page() {
  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);

  return (
    <div>
      {user ? (
        <>
          <SignoutButton />
          <br />
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <p>no user logged in.</p>
      )}
    </div>
  );
}
