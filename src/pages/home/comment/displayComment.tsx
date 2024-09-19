import { FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect } from "react";
import { useAppContext } from "../../../customHook/useAppContext";

interface commentsProps {
  userComment: string;
  userImage: string;
  userName: string;
  userId: string;
}

export const DisplayComment = () => {
  // USESTATE TO SAVE COMMENTS
  const context = useAppContext();

  //FUNCTION TO GET COMMENTS
  const commentRef = collection(db, "comments");
  const getComments = async () => {
    const data = await getDocs(commentRef);
    context?.setPostComment(
      data.docs.map((doc) => ({ ...doc.data() })) as commentsProps[]
    );
  };

  //USEEFFECT TO CALL GEMMENT FUNCTION
  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="displayCommentPag">
      {context?.postComment?.map((comment) => (
        <div className="displayComment">
          <img src={comment.userImage} alt="" className="profileImage" />
          <div className="commentContent">
            <aside>
              <p>{comment.userName}</p>
              <p>{comment.userComment}</p>
            </aside>
            <aside className="postFunctionBtn commentIc">
              <button className="displayButton">
                <aside className="displayIconCon ">
                  {/* className="displayIcon" */}
                  <FaRegComment />
                </aside>
                <p>{0}</p>
              </button>
              <button className="displayButton">
                <aside className="displayIconCon">
                  {/* className="displayIcon" */}
                  <FaRegHeart />
                </aside>
                <p>{0}</p>
              </button>
              <button className="displayButton">
                <aside className="displayIconCon">
                  {/* className="displayIcon" */}
                  <FaRetweet />
                </aside>
                <p>{0}</p>
              </button>
            </aside>
          </div>
        </div>
      ))}
    </div>
  );
};
