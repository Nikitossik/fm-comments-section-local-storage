import React, { useContext, useState } from "react";
import Button from "../Button/Button";

import styles from "./form.module.css";
import commentStyle from "../Comment/comment.module.css";

import { AppContext } from "../../AppProvider/AppContext";

const SendForm = ({
  isReplying,
  comment,
  setIsReplying,
  replyCommentId,
  className = "",
}) => {
  const { currentUser, dispatch } = useContext(AppContext);
  const [content, setContent] = useState("");

  const dispatchAction = isReplying
    ? {
        type: "add_reply",
        replyCommentId,
        replyingTo: comment.user.username,
        content,
      }
    : {
        type: "add_comment",
        content,
      };

  return (
    <form
      className={`${styles.form} ${styles["form--send"]} ${className}`}
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        setContent("");
        if (content.trim()) {
          dispatch(dispatchAction);
          if (isReplying) setIsReplying(false);
        }
      }}
    >
      <div className={`${styles["form-inner"]}`}>
        <textarea
          className={styles["form-textarea"]}
          name="message"
          id="message"
          placeholder="Add a comment…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <a
          href="#"
          className={`${commentStyle["user-avatar"]} ${styles["form__avatar"]}`}
        >
          <img src={currentUser.image.webp} alt="" />
        </a>
        <Button type="submit" className={styles["form__button"]}>
          {isReplying ? "Reply" : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default SendForm;
