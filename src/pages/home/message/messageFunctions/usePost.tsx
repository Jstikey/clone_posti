import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, imageDb } from "../../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import { formInterface } from "../message";
import { postProps } from "../../../../customHook/useAppContext";
import { useAppContext } from "../../../../customHook/useAppContext";
import { v4 } from "uuid";

// FUNCTION TO ADD DOCS TO THE FORM
export const usePost = () => {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState<File | null>(null);
  const [formVal, setFormVal] = useState("");
  const postRef = collection(db, "postRef");
  const context = useAppContext();

  //======================= function to add image to firebase ========================
  const AddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  const upLoadFile = async () => {
    if (file === null) {
      alert("continue without image");
      return;
    }
    try {
      const imageRef = ref(imageDb, `image/${file?.name + v4()}`);
      await uploadBytes(imageRef, file);
      setFile(null);
      const fileUrl = await getDownloadURL(imageRef);
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const addMessage = async (data: formInterface) => {
    try {
      const fileUrl = await upLoadFile();

      const docRef = await addDoc(postRef, {
        message: data.message,
        userName: user?.displayName,
        userEmail: user?.email,
        userImage: user?.photoURL,
        userId: user?.uid,
        file: fileUrl || "",
      });

      await updateDoc(docRef, {
        postId: docRef.id,
      });

      if (user) {
        context?.setPosts(
          (prev) =>
            prev &&
            ([
              ...prev,
              {
                message: data.message,
                userName: user?.displayName,
                userEmail: user?.email,
                userImage: user?.photoURL,
                userId: user?.uid,
                postId: docRef.id,
                file: fileUrl || "",
              },
            ] as postProps[])
        );

        setFormVal("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = async (post: postProps) => {
    try {
      const postQuery = query(postRef, where("message", "==", post.message));
      const getPost = await getDocs(postQuery);
      const PostId = getPost.docs[0].id;
      const postToDel = doc(db, "postRef", PostId);
      deleteDoc(postToDel);
      context?.setPosts(
        context.posts?.filter(
          (newPost) => newPost.postId !== post.postId
        ) as postProps[]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addMessage,
    user,
    formVal,
    setFormVal,
    removePost,
    file,
    setFile,
    AddFile,
    upLoadFile,
  };
};

// {file && <img src={file} />}
