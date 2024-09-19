import { FC, useCallback } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { menuItems } from "./navbarDaa";
import { NavLink } from "react-router-dom";
import { useLogOut } from "../useLogOut";
import { useAppContext } from "../../customHook/useAppContext";

interface sideProps {
  children: React.ReactNode;
}

// interface menuProps {
//   path: string;
//   name: string;
//   icon: JSX.Element;
// }

export const Sidebar: FC<sideProps> = ({ children }) => {
  const { user } = useLogOut();
  const context = useAppContext();

  const showMessage = useCallback(() => {
    context?.setShowMessage(!context.showMessage);
  }, [context]);

  // COMPONENT RETURN
  return (
    <div className="container">
      <div className="sideBar">
        <div className="topSection">
          <h1 className="logo">
            <FaXTwitter />
          </h1>
        </div>
        <div className="middleSection">
          {menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon">{item.icon}</div>
              <div className="linkText">{item.name}</div>
            </NavLink>
          ))}
          <button className="post" onClick={() => showMessage()}>
            Post
          </button>
        </div>
        <NavLink to="profile" className="profile">
          <div className="">
            <img src={user?.photoURL || ""} alt="" className="profileImage" />
            <div className="profileName">
              <p>{user?.displayName}</p>
              <p>{user?.email} </p>
            </div>
          </div>
        </NavLink>
      </div>
      <main className="maini">{children}</main>
    </div>
  );
};
