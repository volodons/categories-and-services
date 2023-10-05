import { useState } from "react";
import { useCategories } from "../../context/CategoriesContext";

const Categories: React.FC = () => {
  const { categories, setCategories } = useCategories();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    setCategories([
      ...categories,
      {
        name: inputValue,
        subcategories: [],
      },
    ]);
  };

  return (
    <>
      <span>Categories</span>
      <button onClick={() => setShowInput(!showInput)}>+</button>
      {showInput && (
        <div>
          <form onSubmit={handleAddCategory}>
            <input
              placeholder="Category name"
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button type="button" onClick={() => setShowInput(false)}>
              -
            </button>
            <button type="submit">+</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Categories;
