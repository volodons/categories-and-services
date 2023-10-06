import { useState } from "react";
import { useCategories } from "../../context/CategoriesContext";

const Subcategory: React.FC = ({ subcategory }) => {
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
    setInputValue(subcategory.name);
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    editCategory(subcategory.id, {
      ...subcategory,
      name: inputValue,
    });
    setShowEditInput(false);
  };

  const handleRemoveCategory = () => {
    removeCategory(subcategory.id);
  };

  return (
    <div>
      {showEditInput ? (
        <div>
          <form onSubmit={handleEditCategory}>
            <input
              defaultValue={subcategory.name}
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button onClick={() => setShowEditInput(false)}>-</button>
            <button type="submit">+</button>
          </form>
        </div>
      ) : (
        <>
          <span>{subcategory.name}</span>
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
    </div>
  );
};

export default Subcategory;

// import { useState } from "react";

// const Category: React.FC = ({ category }) => {
//   const { name, subcategories: initialSubcategories } = category;
//   const [subcategories, setSubcategories] = useState(initialSubcategories);

//   const addNewCategory = () => {
//     setSubcategories([
//       ...subcategories,
//       {
//         name: "New subcategory",
//         subcategories: [],
//       },
//     ]);
//   };

//   const removeCategory = (categoryToRemove) => {
//     setSubcategories(
//       subcategories.filter((subcategory) => subcategory !== categoryToRemove)
//     );
//   };

//   return (
//     <>
//       <h1>{name}</h1>
//       {subcategories &&
//         subcategories.map((subcategory, index) => (
//           <div key={index}>
//             <Category category={subcategory} />
//             <button onClick={addNewCategory}>+</button>
//             <button onClick={() => removeCategory(subcategory)}>-</button>
//           </div>
//         ))}
//     </>
//   );
// };

// export default Category;
