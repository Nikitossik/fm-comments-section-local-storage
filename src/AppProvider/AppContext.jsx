import { createContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import initialState from "../data.json";
import { commentInit, commentReducer } from "./commentReducer";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [data, dispatch] = useImmerReducer(
    commentReducer,
    initialState,
    commentInit
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        currentUser: data.currentUser,
        comments: data.comments,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
