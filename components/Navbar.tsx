import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies(); 
  const isAdmin = cookieStore.get("admin")?.value === "true";

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #333" }}>
      <Link href="/">Home</Link>{" | "}

      {!isAdmin && <Link href="/login">Login</Link>}

      {isAdmin && (
        <>
          {" | "}
          <Link href="/dashboard">Dashboard</Link>{" | "}
          <form
            action="/api/logout"
            method="POST"
            style={{ display: "inline" }}
          >
            <button
              type="submit"
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Logout
            </button>
          </form>
        </>
      )}
    </nav>
  );
}