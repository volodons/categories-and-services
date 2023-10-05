import { useState } from "react";

const Category: React.FC = ({ category }) => {
  const { name, subcategories: initialSubcategories } = category;
  const [subcategories, setSubcategories] = useState(initialSubcategories);

  const addNewCategory = () => {
    setSubcategories([
      ...subcategories,
      {
        name: "New subcategory",
        subcategories: [],
      },
    ]);
  };

  return (
    <>
      <h1>{name}</h1>
      <button onClick={addNewCategory}>+</button>
      {subcategories &&
        subcategories.map((subcategory, index) => (
          <Category key={index} category={subcategory} />
        ))}
    </>
  );
};

export default Category;
