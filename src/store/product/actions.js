import { api } from "boot/axios";
import { Loading, Notify } from "quasar";

export const getList = async ({ commit }, req) => {
  try {
    Loading.show();
    const { keyword, limit, order, page, price } = req;

    const res = await api.get(
      `/api/product?keyword=${keyword}&price=${price.min},${price.max}&page=${page}&limit=${limit}&order=${order},ASC`
    );
    commit("setProduct", res.data.data);
    Loading.hide();
    return res;
  } catch (e) {
    console.log(e);
    Loading.hide();
    Notify.create({
      progress: true,
      message: "Maaf gagal mendapatkan data",
      color: "red",
      textColor: "white",
      position: "top",
      icon: "warning",
      timeout: 5000,
      actions: [{ icon: "close", color: "white", handler: () => {} }],
    });
    throw err;
  }
};
