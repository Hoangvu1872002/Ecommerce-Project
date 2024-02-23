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
  Products,
  FinalRegister,
  ResetPassword,
} from "./pages/public";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./components";

function App() {
  const dispatch = useDispatch();
  const {isShowModal, modalChildren} = useSelector(state => state.app)

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="font-main relative">
    {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.LOGIN} element={<Login></Login>} />
        <Route
          path={path.FINAL_REGISTER}
          element={<FinalRegister></FinalRegister>}
        />
        <Route path={path.PUBLIC} element={<Public></Public>}>
          <Route path={path.HOME} element={<Home></Home>} />
          <Route
            path={path.DETAIL_PRODUCT_CATEGORY_PID__TITLE}
            element={<DetailProduct></DetailProduct>}
          />
          <Route path={path.BLOGS} element={<Blog></Blog>} />
          <Route path={path.FAQS} element={<FAQ></FAQ>} />
          <Route path={path.OUR_SERVICES} element={<Services></Services>} />
          <Route path={path.PRODUCTS} element={<Products></Products>} />
          <Route
            path={path.RESETPASSWORD}
            element={<ResetPassword></ResetPassword>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
