import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Components/E-CommerceProject/FrontEnd/Component/Home";
import Navigation from "./Components/E-CommerceProject/FrontEnd/Component/Navigation";
import Dashboard from "./Components/E-CommerceProject/BackEnd/Dashborad";
import { createContext, useState } from "react";
import { db, storage } from "../src/Components/FireBase/FireBaseConfig";
// import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDocs, collection } from "firebase/firestore";
// import SingleProduct from "./Components/E-CommerceProject/FrontEnd/Component/SingleProduct";
// import AppRoute from "./Components/E-CommerceProject/FrontEnd/Component/AppRoute";
export const contextProvider = createContext();
function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, "Products");
        const productSnapshot = await getDocs(productCollection);
        const productData = productSnapshot.docs.map((doc) => doc.data());
        setIsProducts(productData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchProducts();
  }, []);
  const [isProducts, setIsProducts] = useState([]);
  const [appActions, setAppActions] = useState({
    selectedCategory: "",
  });
  // console.log(appActions.selectedCategory);
  return (
    <>
      <BrowserRouter>
        <contextProvider.Provider
          value={{ isProducts, setIsProducts, setAppActions, appActions }}
        >
          {/* <Dashboard /> */}
          {/* <SignUp /> */}
          {/* <Navigation /> */}
          <Home />
          {/* <AppRoute /> */}
        </contextProvider.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
