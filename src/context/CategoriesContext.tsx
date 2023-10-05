import { createContext, useContext, useState, useMemo } from "react";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const categoriesContextValue = useMemo(
    () => ({ categories, setCategories }),
    [categories, setCategories]
  );

  return (
    <CategoriesContext.Provider value={categoriesContextValue}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
