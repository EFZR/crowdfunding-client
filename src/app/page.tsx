import { cookies } from "next/headers";
import { getServerSideUser } from "../lib";

export default async function page() {
  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);
  return (
    <div>
      {user ? (
        <div>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <p>no user logged in</p>
      )}
    </div>
  );
}
