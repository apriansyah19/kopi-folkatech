<template>
  <q-page class="flex flex-center">
    <q-card
      class="my-card q-pb-xl q-px-lg q-pt-lg shadow-4"
      style="border-radius: 0.5rem; width: 100%; max-width: 28rem"
    >
      <q-form greedy @submit.prevent="onClickLogin">
        <div class="text-h6 text-bold text-secondary">Masuk</div>
        <div class="q-gutter-md q-mt-lg q-mb-md">
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
          <q-input
            v-model="password"
            :type="isPw ? 'password' : 'text'"
            :rules="[required]"
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
          <div
            class="row justify-end text-secondary cursor-pointer"
            style="font-size: 0.6rem"
          >
            <span class="lupa-password q-px-sm"> Lupa Password? </span>
          </div>
        </div>

        <q-btn
          color="primary"
          text-color="white"
          class="full-width shadow-6 q-py-sm"
          type="submit"
          label="Masuk"
        />
      </q-form>

      <q-separator class="q-mx-xl q-my-lg" inset size="2px" />
      <div class="row justify-center" style="font-size: 0.7rem">
        <span class="text-accent">Belum Punya Akun?</span>
        <span
          class="daftar-sekarang text-secondary text-bold cursor-pointer"
          @click="router.push('/registrasi')"
        >
          &nbsp; Daftar Sekarang &nbsp;
        </span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { emailFormat, required } from "src/validation";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
name: "LoginPage";

const router = useRouter();
const store = useStore();
const $q = useQuasar();

const email = ref(null);
const password = ref(null);
const isPw = ref(true);

const onClickLogin = async () => {
  try {
    const req = {
      email: email.value,
      password: password.value,
    };
    const res = await store.dispatch("auth/login", req);
    if (res.data.code === 200) {
      sessionStorage.setItem("session", res.data.data.token);
      $q.notify({
        type: "positive",
        message: "Login success!",
        position: "top",
        icon: "check",
        timeout: 5000,
        actions: [{ icon: "close", color: "white", handler: () => {} }],
      });
      router.push("/product-list");
    }
  } catch (err) {
    console.error("Submit");
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 700px
</style>

<style scoped>
.daftar-sekarang:hover,
.lupa-password:hover {
  background-color: rgb(207, 206, 206);
  border-radius: 0.2rem;
}
</style>
