import { createContext, FC, ReactNode, useContext, useState } from "react";

// APPCONTEXT PROPS
interface AppContextProps {
  postComment: commentProps[] | null;
  setPostComment: React.Dispatch<React.SetStateAction<commentProps[] | null>>;
  showComment: boolean;
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
  posts: postProps[] | null;
  setPosts: React.Dispatch<React.SetStateAction<postProps[] | null>>;
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

//POST PROPS
export interface postProps {
  message: string;
  userName: string;
  userEmail: string;
  userImage: string;
  userId: string;
  postId: string;
  file: string;
}

//COMMENT PROPS
export interface commentProps {
  userComment: string;
  userId: string;
  userImage: string;
  userName: string;
}

interface AppcontextProps {
  children: ReactNode;
}

const GloabalContext = createContext<AppContextProps | null>(null);

//APPCONTEXT CUSTOM HOOK
export const useAppContext = () => useContext(GloabalContext);

//GLOBAL CONTEXT COMPONENT
export const AppContext: FC<AppcontextProps> = ({ children }) => {
  //USESTATES FOR POST AND COMMENT
  const [posts, setPosts] = useState<postProps[] | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [postComment, setPostComment] = useState<commentProps[] | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <GloabalContext.Provider
      value={{
        posts,
        setPosts,
        showComment,
        setShowComment,
        postComment,
        setPostComment,
        showMessage,
        setShowMessage,
      }}
    >
      {children}
    </GloabalContext.Provider>
  );
};
