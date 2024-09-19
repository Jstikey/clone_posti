import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAppContext } from "../../../customHook/useAppContext";
import { commentProps } from "../../../customHook/useAppContext";
import { useState } from "react";
import { commentsFormProp } from "./comment";

export const useComment = () => {
  const [commentVal, setCommentVal] = useState<string>("");
  const context = useAppContext();
  //USEAUTH STATE
  const [user] = useAuthState(auth);
  //FUNNCTION TO ADD COMMENTS TO DATABSE
  const commentRef = collection(db, "comments");

  const addComment = async (data: commentsFormProp) => {
    try {
      await addDoc(commentRef, {
        userComment: data.userComment,
        userImage: user?.photoURL,
        userName: user?.displayName,
        userId: user?.uid,
      });
    } catch (error) {
      console.log(error);
    }
    if (user) {
      context?.setPostComment(
        (prev) =>
          prev &&
          ([
            ...prev,
            {
              userComment: data.userComment,
              userImage: user?.photoURL,
              userName: user?.displayName,
              userId: user?.uid,
            },
          ] as commentProps[])
      );
    }
    setCommentVal("");
  };

  return { addComment, user, commentVal, setCommentVal };
};
