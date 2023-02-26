<template>
  <q-page class="flex flex-center">
    <q-card
      class="my-card q-pb-xl q-px-lg q-pt-lg shadow-4"
      style="border-radius: 0.5rem; width: 100%; max-width: 28rem"
    >
      <q-form greedy @submit.prevent="onRegis">
        <q-tab-panels v-model="panel" animated>
          <q-tab-panel name="first">
            <div class="text-h6 text-bold text-secondary">Daftar Sekarang</div>
            <div class="q-gutter-md q-my-lg">
              <q-input
                v-model="namaDepan"
                :rules="[required]"
                hide-bottom-space
                outlined
                dense
                label-slot
              >
                <template #label>
                  <span style="font-size: 0.7rem">Nama Depan</span>
                </template>
              </q-input>
              <q-input
                v-model="namaBelakang"
                :rules="[required]"
                hide-bottom-space
                dense
                outlined
                label-slot
              >
                <template #label>
                  <span style="font-size: 0.7rem">Nama Belakang</span>
                </template>
              </q-input>
              <q-input
                v-model="email"
                :rules="[required, emailFormat]"
                hide-bottom-space
                outlined
                dense
                label-slot
              >
                <template #label>
                  <span style="font-size: 0.7rem">Email</span>
                </template>
              </q-input>
            </div>
          </q-tab-panel>

          <q-tab-panel name="second">
            <div
              class="text-bold text-secondary cursor-pointer"
              style="font-size: 0.9rem"
              @click="panel = 'first'"
            >
              <q-icon name="arrow_back"></q-icon> Kembali
            </div>
            <div class="q-gutter-md q-my-lg">
              <q-input
                v-model="nomorTelepon"
                :rules="[required, phoneMinLength]"
                hide-bottom-space
                outlined
                dense
                label-slot
                mask="##############"
              >
                <template #label>
                  <span style="font-size: 0.7rem">Nomor Telepon</span>
                </template>
              </q-input>
              <q-input
                v-model="password"
                :type="isPw ? 'password' : 'text'"
                :rules="[required, passwordMinLength]"
                hide-bottom-space
                dense
                outlined
                label-slot
              >
                <template #label>
                  <span style="font-size: 0.7rem">Password</span>
                </template>
                <template #append>
                  <div
                    class="text-secondary cursor-pointer"
                    style="font-size: 0.7rem"
                    @click="isPw = !isPw"
                  >
                    {{ isPw ? "Show" : "Hide" }}
                  </div>
                </template>
              </q-input>
              <q-input
                v-model="confirmPassword"
                :rules="[
                  required,
                  (val) => val === password || 'kata sandi tidak cocok',
                ]"
                hide-bottom-space
                :type="isPwConfirm ? 'password' : 'text'"
                outlined
                dense
                label-slot
              >
                <template #label>
                  <span style="font-size: 0.7rem">Konfirmasi Password</span>
                </template>
                <template #append>
                  <div
                    class="text-secondary cursor-pointer"
                    style="font-size: 0.7rem"
                    @click="isPwConfirm = !isPwConfirm"
                  >
                    {{ isPwConfirm ? "Show" : "Hide" }}
                  </div>
                </template>
              </q-input>
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-btn
          color="primary"
          text-color="white"
          class="full-width shadow-6 q-py-sm"
          type="submit"
          label="Selanjutnya"
        />
      </q-form>

      <q-separator class="q-mx-xl q-my-lg" inset size="2px" />
      <div class="row justify-center" style="font-size: 0.7rem">
        <span class="text-accent">Sudah Punya Akun?</span>
        <span
          class="masuk text-secondary text-bold cursor-pointer"
          @click="router.push('/login')"
        >
          &nbsp; Masuk &nbsp;
        </span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import {
  emailFormat,
  required,
  phoneMinLength,
  passwordMinLength,
} from "src/validation";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
name: "RegistrasiPage";

const router = useRouter();
const store = useStore();
const $q = useQuasar();

const namaDepan = ref(null);
const namaBelakang = ref(null);
const email = ref(null);

const nomorTelepon = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

const isPw = ref(true);
const isPwConfirm = ref(true);

const panel = ref("first");

const onRegis = async () => {
  if (panel.value === "first") {
    panel.value = "second";
    return;
  }

  try {
    const req = {
      email: email.value,
      password: password.value,
      name: `${namaDepan.value} ${namaBelakang.value}`,
      phone: nomorTelepon.value,
    };
    const res = await store.dispatch("auth/registrasi", req);
    if (res.data.code === 200) {
      $q.notify({
        type: "positive",
        message: "Registration success!",
        position: "top",
        icon: "check",
        timeout: 5000,
        actions: [{ icon: "close", color: "white", handler: () => {} }],
      });
      router.push("login");
    }
  } catch (err) {
    console.error("Regis");
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 700px
</style>

<style scoped>
.masuk:hover {
  background-color: rgb(207, 206, 206);
  border-radius: 0.2rem;
}
</style>
