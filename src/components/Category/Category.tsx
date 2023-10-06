import { useState } from "react";
import { useCategories } from "../../context/CategoriesContext";

const Category: React.FC = ({ category }) => {
  const { addCategory, editCategory, removeCategory } = useCategories();
  const [showAddInput, setShowAddInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = (e, category) => {
    e.preventDefault();
    addCategory(category, {
      id: Date.now(),
      name: inputValue,
      subcategories: [],
    });
  };

  const handleEditCategoryClick = () => {
    console.log(category);
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
    <div>
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
              <form onSubmit={(e) => handleAddCategory(e, category)}>
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
      {category.subcategories.length > 0 &&
        category.subcategories.map((subcategory) => (
          <Category key={subcategory.id} category={subcategory} />
        ))}
    </div>
  );
};

export default Category;
