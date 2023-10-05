import { createContext, useContext, useState, useMemo } from "react";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const editCategory = (categoryId, updatedCategory) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  const removeCategory = (categoryId) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
  };

  const categoriesContextValue = useMemo(
    () => ({
      categories,
      setCategories,
      addCategory,
      editCategory,
      removeCategory,
    }),
    [categories, setCategories, addCategory, removeCategory]
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
