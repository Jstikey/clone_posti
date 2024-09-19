import { GoSearch } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { Messages } from "../message/message";
// import { Subscribe } from "./subscribe";
import { DisplayMessage } from "../message/displayMessage";
import { FaXTwitter } from "react-icons/fa6";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import { Subscribe } from "../../subscribe/subscribe";

export const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <nav className="homeNav">
        <div className="topSection1">
          <NavLink to="profile">
            <img src={user?.photoURL || ""} alt="" className="profileImage" />
          </NavLink>
          <h1 className="logo">
            <FaXTwitter />
          </h1>
          <div></div>
        </div>
        <div className="homeNavLink">
          <NavLink className="homeLink" to="">
            For you
          </NavLink>
          <NavLink className="homeLink" to="">
            Following
          </NavLink>
        </div>
        <form className="fontSearch">
          <input type="text" className="search" placeholder="search" />
          <p className="move">
            <GoSearch />
          </p>
        </form>
      </nav>
      <section className="messagePage">
        <div>
          <Messages />
          <div>
            <DisplayMessage />
          </div>
        </div>
        <div className="noShow">
          <Subscribe />
        </div>
      </section>
    </>
  );
};
