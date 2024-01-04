import React, { useContext, useState } from "react";
import Button from "../Button/Button";

import styles from "./form.module.css";
import { AppContext } from "../../AppProvider/AppContext";

const CommentEditForm = ({ content, commentId, setIsEdited }) => {
  const [editedMessage, setEditedMessage] = useState(content);
  const { dispatch } = useContext(AppContext);

  function handleEdit(e) {
    e.preventDefault();
    dispatch({
      type: "update_comment",
      id: commentId,
      changes: {
        content: editedMessage,
      },
    });
    setIsEdited(false);
  }

  return (
    <form
      className={`${styles.form} ${styles["form--update"]}`}
      method="POST"
      onSubmit={handleEdit}
    >
      <div className={`${styles["form-inner"]}`}>
        <textarea
          className={`${styles["form-textarea"]}`}
          name="message"
          id="message"
          placeholder="Add a comment…"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        ></textarea>
        <Button
          type="submit"
          className={styles["form__button"]}
          disabled={!editedMessage}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default CommentEditForm;
