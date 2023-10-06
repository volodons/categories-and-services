import { useState } from "react";
import { useCategories } from "../../context/CategoriesContext";
import Category from "../Category/Category";

const Categories: React.FC = () => {
  const { categories, addCategory, editCategory, removeCategory } =
    useCategories();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddCategory = (e, category) => {
    e.preventDefault();
    addCategory(category, {
      id: Date.now(),
      name: inputValue,
      subcategories: [],
    });
    setInputValue("");
    setShowInput(false);
  };

  return (
    <div>
      <span>{categories[0].name}</span>
      <button onClick={() => setShowInput(!showInput)}>+</button>
      {showInput && (
        <div>
          <form onSubmit={(e) => handleAddCategory(e, categories[0])}>
            <input
              placeholder="Subcategory name"
              defaultValue={categories[0].name}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="button" onClick={() => setShowInput(false)}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </form>
        </div>
      )}
      {categories[0].subcategories.length > 0 &&
        categories[0].subcategories.map((subcategory) => (
          <Category key={subcategory.id} category={subcategory} />
        ))}
    </div>
  );

  // return (
  //   <>
  //     {categories.map((category) => (
  //       <div key={category.id}>
  //         <span>{category.name}</span>
  //         <button onClick={() => setShowInput(!showInput)}>+</button>
  //         {showInput && (
  //           <div>
  //             <form onSubmit={(e) => handleAddCategory(e, category)}>
  //               <input
  //                 placeholder="Subcategory name"
  //                 defaultValue={category.name}
  //                 onChange={(e) => setInputValue(e.target.value)}
  //               />
  //               <button type="button" onClick={() => setShowInput(false)}>
  //                 Cancel
  //               </button>
  //               <button type="submit">Add</button>
  //             </form>
  //           </div>
  //         )}
  //         {category.subcategories.length > 0 && (
  //           <div style={{ marginLeft: "20px" }}>
  //             {category.subcategories.map((subcategory) => (
  //               <div key={subcategory.id}>
  //                 <span>{subcategory.name}</span>
  //                 <button onClick={() => setShowInput(!showInput)}>+</button>
  //                 {showInput && (
  //                   <div>
  //                     <form onSubmit={(e) => handleAddCategory(e, subcategory)}>
  //                       <input
  //                         placeholder="Subcategory name"
  //                         defaultValue={subcategory.name}
  //                         onChange={(e) => setInputValue(e.target.value)}
  //                       />
  //                       <button
  //                         type="button"
  //                         onClick={() => setShowInput(false)}
  //                       >
  //                         Cancel
  //                       </button>
  //                       <button type="submit">Add</button>
  //                     </form>
  //                   </div>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         )}
  //       </div>
  //     ))}
  //   </>
  // );
};

export default Categories;
