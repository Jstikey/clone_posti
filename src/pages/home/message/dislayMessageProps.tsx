import download from "../../../assets/pictures/download.png";
import images from "../../../assets/pictures/images.png";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { Comment } from "../comment/comment";
import { FC, useCallback, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useFont } from "../../../customHook/useFont";
import { postProps, useAppContext } from "../../../customHook/useAppContext";
import { useLikes } from "./messageFunctions/useLike";
import { query, where, getDocs } from "firebase/firestore";
import { usePost } from "./messageFunctions/usePost";

export interface props {
  post: postProps;
}

export interface likesProps {
  userId: string;
  likeId: string;
}

export const DisplayMessageProp: FC<props> = ({ post }) => {
  const { addLikes, removeLikes, user, likesRef, likes, setLikes } =
    useLikes(post);
  const { removePost } = usePost();

  const context = useAppContext();

  const { BlueLargeIcon } = useFont();

  const getLikes = async () => {
    const likeDoc = query(likesRef, where("postId", "==", post.postId));
    try {
      const { docs } = await getDocs(likeDoc);
      setLikes(docs.map((like) => ({ ...like.data() })) as likesProps[]);
    } catch (error) {
      console.log(error);
    }
  };

  const userHasLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const showComment = useCallback(() => {
    context?.setShowComment(!context.showComment);
  }, []);
  // //=======================================
  //              RETURN JSX
  //=====================================

  return (
    <div className="displayMessage1">
      <div className="displayMessage2">
        <aside className="postProfile">
          <img
            src={post.userImage || download}
            alt=""
            className="profileImage"
          />
          <div className="userMessagediv">
            <p>{post.userName}</p>
            <p className="displayPost essages">{post.message}</p>
            <p onClick={() => removePost(post)}>
              <BlueLargeIcon className="displayIcon">
                <MdDeleteOutline />
              </BlueLargeIcon>
            </p>
          </div>
        </aside>
      </div>
      <img
        src={post.file ? post.file : images}
        alt="jjb"
        className="displayImage"
      />
      {context?.showComment && (
        <aside className="commentAside">
          <Comment post={post} />
        </aside>
      )}
      <aside className="postFunctionBtn">
        <button className="displayButton" onClick={showComment}>
          <aside className="displayIconCon">
            <BlueLargeIcon className="displayIcon">
              <FaRegComment />
            </BlueLargeIcon>
          </aside>
          <p>0</p>
        </button>
        <button
          className="displayButton"
          onClick={userHasLiked ? removeLikes : addLikes}
        >
          <aside className="displayIconCon">
            {userHasLiked ? (
              <BlueLargeIcon className="displayIcon">
                <FaHeart />
              </BlueLargeIcon>
            ) : (
              <BlueLargeIcon className="displayIcon">
                <FaRegHeart />
              </BlueLargeIcon>
            )}
          </aside>
          <p>{likes && likes.length}</p>
        </button>
        <button className="displayButton">
          <aside className="displayIconCon">
            <BlueLargeIcon className="displayIcon">
              <FaRetweet />
            </BlueLargeIcon>
          </aside>
        </button>
      </aside>
      <div className="messageLine"></div>
    </div>
  );
};
