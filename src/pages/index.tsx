import { useMe } from "@/hooks/useAuth";

function RouteComponent() {
  const { data: user, isPending } = useMe();

  if (isPending) return <div>Loading…</div>;

  return (
    <div>
      {user ? <p>Logged in as {user.username}</p> : <p>Not logged in</p>}
    </div>
  );
}

export { RouteComponent };
