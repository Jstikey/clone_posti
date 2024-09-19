import { FC, useCallback } from "react";
import { postProps } from "../../../customHook/useAppContext";
import { NavLink } from "react-router-dom";
import { GoFileMedia } from "react-icons/go";
import { MdGif } from "react-icons/md";
import { RiListRadio } from "react-icons/ri";
import { PiSmileyFill } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { DisplayComment } from "./displayComment";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "../../../customHook/useAppContext";
import { useComment } from "./useComment";

export interface commentsFormProp {
  userComment: string;
}

interface postToReplyProps {
  post: postProps;
}

// COMMENT COMPONENT
export const Comment: FC<postToReplyProps> = ({ post }) => {
  const { commentVal, user, addComment, setCommentVal } = useComment();

  //USECONTEXT FROM APP
  const context = useAppContext();

  //SCHEMA FUNCTION TO DEFINE THE SHAPE OF THE FORM
  const schema = yup.object().shape({
    userComment: yup.string().required(),
  });
  //FORM TO ADD COMMENTS TO DATABASE
  const { register, handleSubmit } = useForm<commentsFormProp>({
    resolver: yupResolver(schema),
  });

  //FORM REAL TIME VALUE
  const formRealTimeVal = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentVal(e.target.value);
    },
    []
  );

  const showComment = useCallback(() => {
    context?.setShowComment(!context?.showComment);
  }, []);

  return (
    <section className="commentDiv">
      <div className="CommentNavLink div">
        <NavLink to="" onClick={showComment}>
          x
        </NavLink>
        <NavLink className="draft" to="">
          Drafts
        </NavLink>
      </div>
      <div className="postToReply div">
        <img src={post.userImage} alt="" className="profileImage" />
        <div>
          <div className="Email">
            <p>{post.userName}</p>
            <p>{post.userEmail}</p>
          </div>
          <div className="messageToCommentOn">
            <p>
              replying at <a href="">{post.userName}</a>
            </p>
            <p>{post.message}</p>
          </div>
        </div>
      </div>

      <div className="div">
        <form className="replyForm" onSubmit={handleSubmit(addComment)}>
          <div className="replyFormDiv">
            <img src={user?.photoURL || ""} alt="" className="profileImage" />
            <textarea
              value={commentVal}
              placeholder="Post your reply"
              className="replyTextArea"
              {...register("userComment")}
              onChange={formRealTimeVal}
            />
          </div>
          <div className="commentIconDiv">
            <div className="commentIcon">
              <GoFileMedia />
              <MdGif />
              <RiListRadio />
              <PiSmileyFill />
              <RiCalendarScheduleLine />
              <SlLocationPin />
            </div>
            <input className="reply" type="submit" value="Reply" />
          </div>
        </form>
      </div>

      <div>
        <DisplayComment />
      </div>
    </section>
  );
};
