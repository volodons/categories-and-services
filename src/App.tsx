import MainPage from "./pages/MainPage";
import { CategoriesProvider } from "./context/CategoriesContext";
import "./App.css";

function App() {
  return (
    <CategoriesProvider>
      <MainPage />
    </CategoriesProvider>
  );
}

export default App;
