import { FaXTwitter } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { CiBookmark } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { RiHome2Fill } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { BsSlashSquare } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { GoMail } from "react-icons/go";

export const menuItems = [
  {
    path: "/",
    name: "Home",
    icon: <RiHome2Fill />,
  },
  {
    path: "/explore",
    name: "Explore",
    icon: <GoSearch />,
  },
  {
    path: "/notification",
    name: "Notification",
    icon: <GrNotification />,
  },
  {
    path: "/addfile",
    name: "Messages",
    icon: <GoMail />,
  },
  {
    path: "/grok",
    name: "Grok",
    icon: <BsSlashSquare />,
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    icon: <CiBookmark />,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <CiUser />,
  },

  {
    path: "/premium",
    name: "Premuim",
    icon: <FaXTwitter />,
  },
  {
    path: "/verified",
    name: "Verified Orgs",
    icon: <AiOutlineThunderbolt />,
  },
  {
    path: "/profi",
    name: "Communities",
    icon: <LuUsers />,
  },

  {
    path: "/more",
    name: "More",
    icon: <CiCircleMore />,
  },
];
