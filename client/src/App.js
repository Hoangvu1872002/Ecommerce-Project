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

import {
  AdminLayout,
  Dashboard,
  ManageOrder,
  ManageUser,
  ManageProduct,
  CreateProduct,
} from "./pages/admin";
import { MemberLayout, Personal } from "./pages/member";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./components";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public></Public>}>
          <Route path={path.HOME} element={<Home></Home>} />
          <Route path={path.BLOGS} element={<Blog></Blog>} />
          <Route
            path={path.DETAIL_PRODUCT_CATEGORY_PID__TITLE}
            element={<DetailProduct></DetailProduct>}
          />
          <Route path={path.FAQS} element={<FAQ></FAQ>} />
          <Route path={path.OUR_SERVICES} element={<Services></Services>} />
          <Route path={path.PRODUCTS} element={<Products></Products>} />
          <Route
            path={path.RESETPASSWORD}
            element={<ResetPassword></ResetPassword>}
          />
          <Route path={path.ALL} element={<Home></Home>} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout></AdminLayout>}>
          <Route
            path={path.DASHBOARD}
            element={<Dashboard></Dashboard>}
          ></Route>
          <Route
            path={path.MANAGE_ORDER}
            element={<ManageOrder></ManageOrder>}
          ></Route>
          <Route
            path={path.MANAGE_USER}
            element={<ManageUser></ManageUser>}
          ></Route>
          <Route
            path={path.MANAGE_PRODUCTS}
            element={<ManageProduct></ManageProduct>}
          ></Route>
          <Route
            path={path.CREATE_PRODUCTS}
            element={<CreateProduct></CreateProduct>}
          ></Route>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout></MemberLayout>}>
          <Route path={path.PERSONAL} element={<Personal></Personal>}></Route>
        </Route>
        <Route path={path.LOGIN} element={<Login></Login>} />
        <Route
          path={path.FINAL_REGISTER}
          element={<FinalRegister></FinalRegister>}
        />
      </Routes>
    </div>
  );
}

export default App;
