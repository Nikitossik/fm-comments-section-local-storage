import React from "react";

import styles from "./comment.module.css";
import Comment from "./Comment";

const CommentReplies = ({ comments }) => {
  return (
    <section className={styles["comment-replies"]}>
      <div className={styles["comment-replies__inner"]}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentReplies;
