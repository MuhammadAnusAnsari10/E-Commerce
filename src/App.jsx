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
import { doc, getDocs, collection } from "firebase/firestore";
import SignUp from "./Components/E-CommerceProject/BackEnd/SignUp";
import SignIn from "./Components/E-CommerceProject/BackEnd/SignIn";
import LogOut from "./Components/E-CommerceProject/BackEnd/LogOut";
import Dialog from "./Components/E-CommerceProject/FrontEnd/DialogBox";
import AllProducts from "./Components/E-CommerceProject/BackEnd/AllProducts";
import UpdateProduct from "./Components/E-CommerceProject/BackEnd/UpdateProduct";
import UserInfo from "./Components/E-CommerceProject/FrontEnd/Component/UserInfo";
import Shop from "./Components/E-CommerceProject/FrontEnd/Component/Shop";
import CheckOut from "./Components/E-CommerceProject/FrontEnd/Component/CheckOut";
export const contextProvider = createContext();
function App() {
  const [isProducts, setIsProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [checkCategory, setCheckCategory] = useState([]);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [appActions, setAppActions] = useState({
    selectedCategory: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, "Products");
        const productSnapshot = await getDocs(productCollection);
        const productData = productSnapshot.docs.map((doc) => doc.data());
        setIsProducts(productData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchProducts();
  }, [isDeleteProduct]);

  const addToCartHandler = (newCartItem) => {
    // setCartItem((prevState) => [...prevState, newCartItem]);
    const data = [...cartItem, newCartItem];
    setCartItem(data);
    localStorage.setItem("cartProducts", JSON.stringify(data));
    console.log(data);
  };
  useEffect(() => {
    const cartProduct = localStorage.getItem("cartProducts");
    const singleCartProduct = JSON.parse(cartProduct);
  }, [cartItem]);

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
            isLoading,
            isDeleteProduct,
            setIsDeleteProduct,
            categories,
            setCategories,
            checkCategory,
            setCheckCategory,
            addToCartHandler,
            cartItem,
            setCartItem,
          }}
        >
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/account" element={<UserInfo />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkOut" element={<CheckOut />} />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route index path="allproduct" element={<AllProducts />} />
              <Route path="updateProduct" element={<UpdateProduct />} />
              <Route path="order" element={<Order />} />
              <Route path="product" element={<Product />} />
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
