import React, { useContext, useEffect, useRef } from "react";

import Button from "../Button/Button";

import styles from "./modal.module.css";
import { ModalContext } from "./ModalProvider/ModalContext";

const DeleteModal = () => {
  const { handleModalClose, handleCommentDelete, isModalOpen } =
    useContext(ModalContext);

  const backdropRef = useRef(null);

  useEffect(() => {
    backdropRef.current.addEventListener("click", handleModalClose);

    // return () => {
    //   console.log(backdropRef.current);
    //   backdropRef.current.removeEventListener("click", handleModalClose);
    // };
  }, [isModalOpen]);

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-backdrop"]} ref={backdropRef}></div>
      <div className={styles["modal-inner"]}>
        <div className={styles["modal-item"]}>
          <div className={styles["modal-item__body"]}>
            <header className={styles["modal-item__header"]}>
              <h2 className={styles["modal-title"]}>Delete comment</h2>
            </header>
            <div className={styles["modal-item__content"]}>
              <p className="text">
                Are you sure you want to delete this comment? This will remove
                the comment and can’t be undone.
              </p>
            </div>
            <footer className={styles["modal-item__footer"]}>
              <Button
                className={`${styles["modal-button"]} ${styles["modal-button--cancel"]}`}
                onClick={handleModalClose}
              >
                No, cancel
              </Button>
              <Button
                className={`${styles["modal-button"]} ${styles["modal-button--delete"]}`}
                onClick={handleCommentDelete}
              >
                Yes, delete
              </Button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
