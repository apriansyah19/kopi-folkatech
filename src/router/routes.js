const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "/login", component: () => import("pages/auth/LoginPage.vue") },
      {
        path: "/registrasi",
        component: () => import("pages/auth/RegistrasiPage.vue"),
      },
    ],
  },
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    props: true,
    children: [
      {
        path: "/product-list",
        component: () => import("pages/product/indexPage.vue"),
        props: true,
      },
      {
        path: "/product/:id?",
        component: () => import("pages/product/detailProduct.vue"),
        name: "detailProduct",
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
