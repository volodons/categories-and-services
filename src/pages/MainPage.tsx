import Category from "../components/Category/Category";

const MainPage: React.FC = () => {
  const categories = [
    {
      name: "Category 1",
      subcategories: [
        {
          name: "Subcategory 1.1",
          subcategories: [
            {
              name: "Subcategory 1.1.1",
              subcategories: [],
            },
          ],
        },
      ],
    },
    {
      name: "Category 2",
      subcategories: [
        {
          name: "Subcategory 2.1",
          subcategories: [],
        },
      ],
    },
  ];

  return (
    <>
      {categories.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </>
  );
};

export default MainPage;
