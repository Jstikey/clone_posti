import { useLogOut } from "../useLogOut";

export const Profile = () => {
  const { logOut } = useLogOut();
  return (
    <div>
      <button className="submit log" onClick={logOut}>
        Logout
      </button>
    </div>
  );
};
