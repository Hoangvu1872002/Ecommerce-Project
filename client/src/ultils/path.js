const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs/:blogs",
  OUR_SERVICES: "services/:services",
  FAQS: "faqs",
  DETAIL_PRODUCT_CATEGORY_PID__TITLE: ":category/:pid/:title",
  DETAIL_BLOG_TITLE: "blogs/:blogs/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESETPASSWORD: "reset-password/:token",
  DETAIL_CART: "my-cart",
  DETAIL_CHECKOUT: "checkout",

  //admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_USER: "manage-user",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCTS: "create-products",

  // member
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  HISTORY: "buy-history",
  WISLIST: "wishlist",
  CHECKOUT: "checkout",
};
export default path;
