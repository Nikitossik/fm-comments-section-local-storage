import SendForm from "./components/Forms/SendForm";
import Comment from "./components/Comment/Comment";
import CommentReplies from "./components/Comment/CommentReplies";
import DeleteModal from "./components/Modals/DeleteModal";

import { AppContext } from "./AppProvider/AppContext";
import { ModalContext } from "./components/Modals/ModalProvider/ModalContext";
import { useContext, useState, useLayoutEffect, useEffect } from "react";

import getScrollbarWidth from "./utils/getScrollbarWidth";

const scrollbarWidth = getScrollbarWidth();

const App = () => {
  const { comments } = useContext(AppContext);
  const { isModalOpen } = useContext(ModalContext);

  useLayoutEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("locked");
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      console.log(scrollbarWidth);
    } else {
      document.body.classList.remove("locked");
      document.body.style.paddingRight = `0px`;
    }
  }, [isModalOpen]);

  return (
    <div className="wrapper">
      <div className="container">
        <main className="comments">
          {comments.map((comment) => (
            <>
              <Comment key={comment.id} comment={comment} />
              {comment.replies.length != 0 && (
                <CommentReplies
                  key={`replies-${comment.id}`}
                  comments={comment.replies}
                />
              )}
            </>
          ))}
          <SendForm />
        </main>
      </div>
      {isModalOpen && <DeleteModal />}
    </div>
  );
};

export default App;
