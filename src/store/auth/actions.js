import { api } from "boot/axios";
import { Loading, Notify } from "quasar";

export const login = async ({ commit }, req) => {
  try {
    Loading.show();
    const res = await api.post("/api/login", req);
    Loading.hide();
    return res;
  } catch (e) {
    Loading.hide();
    Notify.create({
      progress: true,
      message: "Maaf Email atau Password anda salah!",
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

export const registrasi = async ({ commit }, req) => {
  try {
    Loading.show();
    const res = await api.post("/api/register", req);
    Loading.hide();
    return res;
  } catch (e) {
    Loading.hide();
    Notify.create({
      progress: true,
      message: "Maaf Registrasi Gagal",
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
