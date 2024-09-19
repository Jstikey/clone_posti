import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../../config/firebase";
import { likesProps } from "../dislayMessageProps";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { postProps } from "../../../../customHook/useAppContext";

export const useLikes = (post: postProps) => {
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<likesProps[] | null>(null);

  const likesRef = collection(db, "likes");
  const addLikes = async () => {
    try {
      const likeIdRef = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.postId,
      });

      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: likeIdRef.id }]
            : ([{ userId: user?.uid, likeId: likeIdRef.id }] as likesProps[])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLikes = async () => {
    const likeQuery = query(
      likesRef,
      where("postId", "==", post.postId),
      where("userId", "==", user?.uid)
    );
    const likeToDelRef = await getDocs(likeQuery);
    const likeToDelId = likeToDelRef.docs[0].id;
    const likeToDel = doc(db, "likes", likeToDelId);
    await deleteDoc(likeToDel);

    setLikes(
      (prev) =>
        prev?.filter((like) => like.likeId !== likeToDelId) as likesProps[]
    );
  };

  return { addLikes, removeLikes, user, likesRef, likes, setLikes };
};
