import { createContext, useContext, useState, useMemo } from "react";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    {
      id: Date.now(),
      name: "Categories",
      subcategories: [],
    },
  ]);

  function findCategoryById(categories, categoryId) {
    for (let category of categories) {
      if (category.id === categoryId) {
        return category;
      }
      if (category.subcategories && category.subcategories.length > 0) {
        const foundCategory = findCategoryById(
          category.subcategories,
          categoryId
        );
        if (foundCategory) {
          return foundCategory;
        }
      }
    }
    return null; // Return null if the category is not found
  }

  const addCategory = (parentCategoryId, newCategory) => {
    const updatedCategories = categories.map((category) =>
      category.id === parentCategoryId
        ? {
            ...category,
            subcategories: [
              ...category.subcategories,
              {
                ...newCategory,
                subcategories: [], // Initialize with an empty subcategories array
              },
            ],
          }
        : category
    );
    setCategories(updatedCategories);
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
