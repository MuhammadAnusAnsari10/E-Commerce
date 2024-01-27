import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Components/E-CommerceProject/FrontEnd/Component/Home";
import Navigation from "./Components/E-CommerceProject/FrontEnd/Component/Navigation";
import Category from "./Components/E-CommerceProject/BackEnd/Category";
import Coupan from "./Components/E-CommerceProject/BackEnd/Coupan";
import Product from "./Components/E-CommerceProject/BackEnd/Product";
import Order from "./Components/E-CommerceProject/BackEnd/Order";
import Dashboard from "./Components/E-CommerceProject/BackEnd/Dashborad";
import { createContext, useState } from "react";
import { db, storage } from "../src/Components/FireBase/FireBaseConfig";
// import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDocs, collection } from "firebase/firestore";
import SignUp from "./Components/E-CommerceProject/BackEnd/SignUp";
import SignIn from "./Components/E-CommerceProject/BackEnd/SignIn";
import LogOut from "./Components/E-CommerceProject/BackEnd/LogOut";
import Dialog from "./Components/E-CommerceProject/FrontEnd/DialogBox";
// import SingleProduct from "./Components/E-CommerceProject/FrontEnd/Component/SingleProduct";
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
  const [isLogin, setIsLogin] = useState(false);

  // console.log(appActions.selectedCategory);
  return (
    <>
      {/* <Dialog /> */}
      <BrowserRouter>
        <contextProvider.Provider
          value={{
            isProducts,
            setIsProducts,
            setAppActions,
            appActions,
            isLogin,
            setIsLogin,
          }}
        >
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/logout" element={<LogOut />} />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route index path="product" element={<Product />} />
              <Route path="order" element={<Order />} />
              <Route path="category" element={<Category />} />
              <Route path="coupan" element={<Coupan />} />
            </Route>
          </Routes>
        </contextProvider.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
