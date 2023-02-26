import { boot } from "quasar/wrappers";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const session = sessionStorage.getItem("session");
    if (session) {
      if (to.path === "/register" || to.path === "/login" || to.path === "/") {
        next("/product-list");
      }
    } else if (to.path === "/product-list" || to.path === "/") {
      return next("/login");
    }
    next();
  });
});
