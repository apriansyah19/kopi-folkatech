<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black q-py-sm">
      <q-toolbar>
        <q-space></q-space>
        <q-input
          v-model="search"
          style="width: 400px"
          class="q-mx-md"
          dense
          outlined
          placeholder="cari produk"
        >
          <template #after>
            <q-btn
              style="margin-left: -9px; border-radius: 0px 7px 7px 0px"
              color="primary"
              class="q-py-sm q-px-md"
              dense
              icon="search"
              @click="searchData()"
            />
          </template>
          <template #append>
            <q-icon
              v-if="search"
              name="close"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
        <q-btn flat round dense size="13px" icon="fa-regular fa-heart" />
        <q-btn flat round dense class="q-mx-sm" icon="shopping_bag" />
        <q-btn-dropdown
          icon="fa-regular fa-user"
          size="12px"
          flat
          dense
          class="q-mr-lg"
        >
          <q-list>
            <q-item v-close-popup clickable @click="onLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }"
        ><component :is="Component" ref="view" :search="search" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
name: "MainLayout";
const router = useRouter();

const search = ref("");
const view = ref(null);

const searchData = (event) => {
  view.value.getData();
};

const onLogout = async () => {
  sessionStorage.removeItem("session");
  router.replace("/login");
};
</script>
