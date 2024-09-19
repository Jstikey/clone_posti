import { ImEarth } from "react-icons/im";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePost } from "./messageFunctions/usePost";
import { useAppContext } from "../../../customHook/useAppContext";
import { useFont } from "../../../customHook/useFont";
import { FaRegImage } from "react-icons/fa6";

// PROPS FOR FORM DATA
export interface formInterface {
  message: string;
}

//MESSAGE COMPONENT
export const Messages = () => {
  const { BlueLargeIcon } = useFont();
  // USEPOST HOOKS
  const { addMessage, user, formVal, setFormVal, AddFile, upLoadFile } =
    usePost();
  const context = useAppContext();

  //FORM SCHEMA
  const schema = yup.object().shape({
    message: yup.string().required("please fill before submiting"),
    file: yup.mixed(),
  });

  //USEFORM FUNCTION
  const { register, handleSubmit } = useForm<formInterface>({
    resolver: yupResolver(schema),
  });

  //FORM VALUE
  const handleChanger = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormVal(e.target.value);
  };

  return (
    <div className={context?.showMessage ? "message showMessge" : "message"}>
      <div className="profileImage">
        <img src={user?.photoURL || ""} alt="" className="profileImage" />
      </div>
      <div className="formDiv">
        <form
          className="myForm"
          onSubmit={handleSubmit(addMessage, upLoadFile)}
        >
          <textarea
            value={formVal}
            {...register("message")}
            onChange={handleChanger}
            // onBlur={() => setIsActive(false)}
            className="formInput"
            id="post"
            placeholder="What is happening?!"
          />
          <div className="file-input-wrapper">
            <label htmlFor="addFile" className="file-label">
              <p className="galleryIcon">
                <BlueLargeIcon className="galleryIcon">
                  <FaRegImage />
                </BlueLargeIcon>
              </p>

              <input
                type="file"
                className="formInput "
                id="addFile"
                onChange={(e) => AddFile(e)}
              />
            </label>
            <span className="imageText">you can add an image</span>
            <div className="line fileLine">
              <p>
                <ImEarth />
              </p>
              <p>Every one can reply</p>
            </div>
          </div>
          <input
            type="submit"
            value="post"
            className="postin"
            onClick={() => context?.setShowMessage(!context.showMessage)}
          />
        </form>
      </div>
    </div>
  );
};
