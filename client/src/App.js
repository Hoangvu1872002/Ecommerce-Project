import path from "./ultils/path";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Blog,
  DetailProduct,
  FAQ,
  Home,
  Login,
  Public,
  Services,
  Product,
  FinalRegister,
} from "./pages/public";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.LOGIN} element={<Login></Login>} />
        <Route
          path={path.FINAL_REGISTER}
          element={<FinalRegister></FinalRegister>}
        />
        <Route path={path.PUBLIC} element={<Public></Public>}>
          <Route path={path.HOME} element={<Home></Home>} />
          <Route path={path.PRODUCTS} element={<Product></Product>} />
          <Route path={path.BLOGS} element={<Blog></Blog>} />
          <Route
            path={path.DETAIL_PRODUCT__PID__TITLE}
            element={<DetailProduct></DetailProduct>}
          />
          <Route path={path.FAQS} element={<FAQ></FAQ>} />
          <Route path={path.OUR_SERVICES} element={<Services></Services>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
