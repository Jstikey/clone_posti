import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return { logOut, user };
};
