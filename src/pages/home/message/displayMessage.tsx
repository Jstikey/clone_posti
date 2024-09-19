import { db } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useTransition } from "react";
import { DisplayMessageProp } from "./dislayMessageProps";
import { postProps, useAppContext } from "../../../customHook/useAppContext";
import { Spinner } from "../../../customHook/spinner/spinner";

export interface disProps extends postProps {
  PostId: string;
}

//DISPLAY MESSAGE COMPONENET
export const DisplayMessage = () => {
  const context = useAppContext();
  const postRef = collection(db, "postRef");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransitiion] = useTransition();

  //FUNCTION TO GET POST FROM DATABASE
  const getPost = async () => {
    try {
      const { docs } = await getDocs(postRef);
      startTransitiion(() => {
        context?.setPosts(
          docs.map((doc) => ({ ...doc.data(), PostId: doc.id })) as disProps[]
        );
      });
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  if (isLoading)
    return (
      <div className="spinnerContainer">
        <Spinner />
      </div>
    );
  if (isPending)
    return (
      <div className="spinnerContainer">
        <h1>loading....</h1>;
      </div>
    );

  return (
    <div>
      {context?.posts?.map((post) => (
        <DisplayMessageProp post={post} />
      ))}
    </div>
  );
};

// import { onSnapshot } from "firebase/firestore";

// const getPost = () => {
//   try {
//     const unsubscribe = onSnapshot(postRef, (snapshot) => {
//       const posts = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         PostId: doc.id,
//       })) as disProps[];
//       context?.setPosts(posts);
//     });

//     // Clean up listener on unmount
//     return () => unsubscribe();
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     setIsError("Failed to Load");
//   } finally {
//     setIsLoading(false);
//   }
// };

// useEffect(() => {
//   const unsubscribe = getPost();
//   return () => unsubscribe(); // Clean up the listener
// }, []);
