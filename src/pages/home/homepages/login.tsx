import { useNavigate } from "react-router-dom";
import { provider, auth } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { PhoneAuth } from "./phoneLogin";

export const Login = () => {
  const navigate = useNavigate();
  const Login = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div
      className="login"
      style={{
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <button className="loginButton" onClick={Login}>
        Login
      </button>
      <PhoneAuth />
    </div>
  );
};
