<template>
  <q-page style="background: #f5f5f5">
    <!-- f5f5f5 1d1d1d -->
    <q-btn-dropdown
      :class="
        $q.screen.xl || $q.screen.lg ? 'q-mx-xl' : $q.screen.md ? 'q-mx-lg' : ''
      "
      color="primary"
      style="left: 4.63%; padding: 1rem 2rem 1rem 2rem"
      label="Belanja"
    >
    </q-btn-dropdown>
    <div
      :class="`bg-white q-pb-xl ${
        $q.screen.xl || $q.screen.lg ? 'q-px-xl' : $q.screen.md ? 'q-px-md' : ''
      }`"
      style="margin-top: 1.5rem; padding-bottom: 10%"
    >
      <q-breadcrumbs
        class="text-primary q-mb-lg"
        style="padding-left: 4.63%"
        gutter="lg"
        active-color="grey"
      >
        <template #separator>
          <q-icon size="0.5rem" name="fa-solid fa-angles-right" color="grey" />
        </template>

        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Produk" to="/product-list" />
        <q-breadcrumbs-el :label="route.params.id" />
      </q-breadcrumbs>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col flex justify-center">
          <q-carousel
            v-model="slide"
            style="width: 60%"
            swipeable
            animated
            thumbnails
            control-color="black"
            arrows
            infinite
          >
            <q-carousel-slide
              v-for="(img, index) in dataProductDetail.images"
              :key="img"
              :name="index + 1"
              :img-src="img.image_url"
            />
          </q-carousel>
        </div>
        <div class="col text-left">
          <div class="text-bold q-mb-sm" style="font-size: 1rem">
            {{ cleanText(dataProductDetail.name) }}
          </div>

          <div>{{ dataProductDetail.product_type.name }}</div>
          <div>
            <q-rating
              :model-value="5"
              readonly
              size="1.1em"
              style="color: #ffc107"
            />
            <span style="font-size: 0.7rem">&nbsp; &nbsp;(7)</span>
          </div>
          <div class="q-my-sm row" style="padding-right: 30%">
            <span
              class="text-primary text-bold col text-left"
              style="font-size: 1.05rem"
              >{{ formatCurrency(dataProductDetail.price) }}</span
            >
            <div
              class="col text-right"
              style="font-size: 0.8rem; padding-right: 15%; color: #6f8eff"
            >
              <div class="row align-center">
                <span class="col text-weight-light">
                  <q-icon name="task_alt"></q-icon> Tersedia
                </span>
              </div>
            </div>
          </div>

          <div class="q-gutter-sm q-mt-md">
            <q-btn outline color="grey-7">-</q-btn>
            <q-btn outline class="" color="grey-7">&nbsp; 1 &nbsp; </q-btn>
            <q-btn outline color="grey-7">+</q-btn>

            <q-btn
              class="q-mx-md"
              color="primary"
              label="Tambah Keranjang"
            ></q-btn>

            <q-btn
              flat
              icon="fa-regular fa-heart"
              color="primary"
              style="background-color: #f5f5f5"
            ></q-btn>
          </div>

          <div class="q-my-lg">
            {{ cleanText(dataProductDetail.short_description) }}
          </div>
        </div>
      </div>

      <div class="q-my-xl">
        <q-tabs
          v-model="tab"
          class="tabs"
          active-color="primary"
          dense
          align="center"
          active-class="text-bold"
        >
          <q-tab name="deskripsi" label="Deskripsi" />
          <q-tab name="informasi" label="Informasi" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="deskripsi"
            class="text-justify q-my-lg"
            style="padding: 15px 10% 0px 10%"
          >
            {{ dataProductDetail.description }}
          </q-tab-panel>

          <q-tab-panel
            name="informasi"
            class="text-justify q-my-lg"
            style="padding: 15px 10% 0px 10%"
          >
            {{ dataProductDetail.description }}
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <div class="q-my-xl">
        <q-tabs
          v-model="tabRecomend"
          class="tabsReco"
          active-color="primary"
          dense
          narrow-indicator
          align="center"
          active-class="text-bold"
        >
          <q-tab name="recomend" label="Rekomendasi Untuk Anda" />
        </q-tabs>

        <q-tab-panels v-model="tabRecomend" animated>
          <q-tab-panel
            name="recomend"
            class="text-justify"
            style="padding: 15px 20% 10px 20%"
          >
            <div class="row q-col-gutter-md">
              <div v-for="data in dataRecomend" :key="data.id" class="col-4">
                <ImageProduct
                  :name="data.name"
                  :type="data.product_type.name"
                  :price="formatCurrency(data.price, true)"
                  :image="
                    data.images.length > 0
                      ? data.images[0].image_url
                      : 'https://i.ibb.co/H4Ymyr2/folkatech.jpg'
                  "
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ImageProduct from "src/components/ImageProduct.vue";
name: "detailProduct";

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
});

const slide = ref(1);

const getData = () => {
  getDataList();
};

const getDataList = async () => {
  try {
    const req = {
      keyword: props.search.trim(),
      price: {
        min: 10000,
        max: 1000000,
      },
      page: 1,
      limit: 10,
      order: "product_name",
    };
    const res = await store.dispatch("product/getList", req);
  } catch (err) {
    console.log(err);
  }
};

defineExpose({
  getData,
});

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const store = useStore();

const tab = ref("deskripsi");
const tabRecomend = ref("recomend");

const dataRecomend = ref([
  {
    id: 1,
    name: "ABID CLEVER DRIPPER 102",
    product_type: {
      name: "UBRUKOPI",
    },
    price: 480000,
    images: [
      {
        image_url: "https://i.ibb.co/7X4Bdk7/image1.png",
      },
    ],
  },
  {
    id: 2,
    name: "KALITA FP PAPER FILTER 10222",
    product_type: {
      name: "UBRUKOPI",
    },
    price: 80000,
    images: [
      {
        image_url: "https://i.ibb.co/q1vWF0X/image2.png",
      },
    ],
  },
  {
    id: 3,
    name: "HARIO GLASS RANGE SERLINA",
    product_type: {
      name: "UBRUKOPI",
    },
    price: 499000,
    images: [
      {
        image_url: "https://i.ibb.co/09wcrmM/image-3.png",
      },
    ],
  },
]);

// COMPUTED

const dataProductDetail = computed(
  () => store.getters["product/getDataProductDetail"]
);

// MOUNTED

onMounted(() => {
  if (!route.params.id || !dataProductDetail.value) {
    $q.notify({
      type: "warning",
      message: "Product Detail Tidak Ditemukan!",
      position: "top",
      textColor: "white",
      icon: "info",
      timeout: 5000,
      actions: [{ icon: "close", color: "white", handler: () => {} }],
    });
    router.replace("/product-list");
  }
});

// METHODS
const formatCurrency = (val, cond = false) => {
  let result = val.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
    minminimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (cond) {
    return result.replace("Rp", "").trim();
  }
  return result;
};

const cleanText = (val) => {
  return val.replace(/[\\"]/g, "");
};
</script>

<style lang="sass">
.tabs, .tabsReco
  .q-tab__label
    font-size: 17px
    font-weight: bold
    padding: 0px 100px 0px 100px

.tabsReco
  .q-tab__indicator
    position: static
    height: 2px
    width: 10rem
</style>
