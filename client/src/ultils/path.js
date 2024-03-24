const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  FAQS: "faqs",
  DETAIL_PRODUCT_CATEGORY_PID__TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESETPASSWORD: 'reset-password/:token',

  //admin
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  MANAGE_PRODUCTS:'manage-products',
  MANAGE_USER:'manage-user',
  MANAGE_ORDER:'manage-order',
  CREATE_PRODUCTS:'create-products',

  // member
  MEMBER: 'member',
  PERSONAL: 'personal'
};
export default path;
