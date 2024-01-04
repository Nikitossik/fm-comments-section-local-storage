import React, { useContext, useState } from "react";

import useMediaQuery from "../../hooks/useMediaQuery";

import { AppContext } from "../../AppProvider/AppContext";
import DeleteModal from "../Modals/DeleteModal";
import CommentScore from "./CommentScore";
import SendForm from "../Forms/SendForm";
import CommentEditForm from "../Forms/CommentEditForm";
import styles from "./comment.module.css";
import formStyles from "../Forms/form.module.css";
import { ModalContext } from "../Modals/ModalProvider/ModalContext";

const CommentActionButton = ({ onClick, children, className, ...props }) => {
  return (
    <button
      className={`${styles["comment-action-button"]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Comment = ({ comment }) => {
  const { currentUser, comments, dispatch } = useContext(AppContext);
  const { isModalOpen, setIsModalOpen, setCommentToDelete } =
    useContext(ModalContext);
  const isTablet = useMediaQuery("(min-width: 40em)");

  const [isReplying, setIsReplying] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const isMe = comment.user.username == currentUser.username;

  const closestParentComment = comments.find((parentComment) => {
    return parentComment.replies?.find((c) => c.id === comment.id);
  });

  const replyCommentId = closestParentComment
    ? closestParentComment.id
    : comment.id;

  const commentActions = (
    <div className={styles["comment-actions"]}>
      {isMe && (
        <CommentActionButton
          className={`${styles["comment-action-button--delete"]}`}
          onClick={() => {
            setCommentToDelete(comment.id);
            setIsModalOpen(!isModalOpen);
          }}
        >
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
              fill="currentColor"
            />
          </svg>
          <span>Delete</span>
        </CommentActionButton>
      )}
      {isMe ? (
        <CommentActionButton onClick={() => setIsEdited(!isEdited)}>
          {isEdited ? (
            <svg
              width="14"
              fill="currentColor"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>{" "}
            </svg>
          ) : (
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                fill="currentColor"
              />
            </svg>
          )}

          <span>{isEdited ? "Cancel" : "Edit"}</span>
        </CommentActionButton>
      ) : (
        <CommentActionButton onClick={() => setIsReplying(!isReplying)}>
          {isReplying ? (
            <svg
              width="14"
              fill="currentColor"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>{" "}
            </svg>
          ) : (
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="currentColor"
              />
            </svg>
          )}

          <span>{isReplying ? "Cancel" : "Reply"}</span>
        </CommentActionButton>
      )}
    </div>
  );

  let editFormMessage = comment.replyingTo ? "@" + comment.replyingTo : " ";
  editFormMessage += comment.content;

  return (
    <>
      <article className={styles.comment}>
        <div className={styles["comment-inner"]}>
          <header className={styles["comment-header"]}>
            <div className={styles["comment-user"]}>
              <a href="#" className={styles["user-avatar"]}>
                <img
                  src={comment.user.image.webp}
                  alt={comment.user.username + " avatar"}
                />
              </a>
              <a href="#" className={styles["user-name"]}>
                {comment.user.username}
                {isMe && (
                  <span className={styles["user-name__badge"]}>you</span>
                )}
              </a>

              <span className={styles["comment-text"]}>
                {comment.createdAt}
              </span>
            </div>

            {isTablet && commentActions}
          </header>
          <div className={styles["comment-body"]}>
            {isEdited ? (
              <CommentEditForm
                content={editFormMessage}
                commentId={comment.id}
                setIsEdited={setIsEdited}
              />
            ) : (
              <p className={styles["comment-text"]}>
                {comment.replyingTo && (
                  <a href="#" className={styles["comment-link"]}>
                    @{comment.replyingTo}&nbsp;
                  </a>
                )}
                {comment.content}
              </p>
            )}
          </div>
          <footer className={styles["comment-footer"]}>
            <CommentScore comment={comment} />
            {!isTablet && commentActions}
          </footer>
        </div>
      </article>
      {isReplying && (
        <SendForm
          isReplying={isReplying}
          setIsReplying={setIsReplying}
          comment={comment}
          replyCommentId={replyCommentId}
          className={formStyles["form--reply"]}
        />
      )}
    </>
  );
};

export default Comment;
