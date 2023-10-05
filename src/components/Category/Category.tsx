import { useState } from "react";
import { useCategories } from "../../context/CategoriesContext";

const Category: React.FC = ({ category }) => {
  const { addCategory, editCategory, removeCategory } = useCategories();
  const [showAddInput, setShowAddInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    addCategory({
      name: inputValue,
      subcategories: [],
    });
  };

  const handleEditCategoryClick = () => {
    setShowEditInput(!showEditInput);
    setInputValue(category.name);
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    editCategory(category.id, {
      ...category,
      name: inputValue,
    });
    setShowEditInput(false);
  };

  const handleRemoveCategory = () => {
    removeCategory(category.id);
  };

  return (
    <>
      {showEditInput ? (
        <div>
          <form onSubmit={handleEditCategory}>
            <input
              defaultValue={category.name}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button onClick={() => setShowEditInput(false)}>-</button>
            <button type="submit">+</button>
          </form>
        </div>
      ) : (
        <>
          <span>{category.name}</span>
          <button onClick={() => setShowAddInput(!showAddInput)}>+</button>
          <button onClick={handleEditCategoryClick}>/</button>
          <button type="button" onClick={handleRemoveCategory}>
            -
          </button>
          {showAddInput && (
            <div>
              <form onSubmit={handleAddCategory}>
                <input
                  placeholder="Category name"
                  onChange={(e) => setInputValue(e.target.value)}
                ></input>
                <button type="button" onClick={() => setShowAddInput(false)}>
                  -
                </button>
                <button type="submit">+</button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Category;
