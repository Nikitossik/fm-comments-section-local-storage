import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../AppProvider/AppContext";

export const ModalContext = createContext(null);

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [commentToDelete, setCommentToDelete] = useState(null);

  const { dispatch } = useContext(AppContext);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleCommentDelete() {
    dispatch({
      type: "delete_comment",
      id: commentToDelete,
    });
    handleModalClose();
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        handleModalClose,
        handleCommentDelete,
        setCommentToDelete,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
