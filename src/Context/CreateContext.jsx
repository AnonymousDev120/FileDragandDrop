import { createContext, useContext, useState } from "react";

const CreateContext = createContext();

export const CreateContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [createBookList, setCreateBookList] = useState([]);

  return (
    <CreateContext.Provider
      value={{
        count,
        setCount,
        bookData,
        setBookData,
        createBookList,
        setCreateBookList,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export const useCreateContext = () => {
  return useContext(CreateContext);
};
