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
      :class="`bg-white ${
        $q.screen.xl || $q.screen.lg ? 'q-px-xl' : $q.screen.md ? 'q-px-md' : ''
      }`"
      style="margin-top: 1.5rem"
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
        <q-breadcrumbs-el label="Produk" />
        <q-breadcrumbs-el label="Roasted Bean" />
      </q-breadcrumbs>

      <div class="row q-col-gutter-xs" style="padding: 0 4.63% 3% 4.63%">
        <div class="col-sm-4 col-md-4 col-lg-3 q-pr-md">
          <q-btn
            align="between"
            class="full-width text-bold q-px-none"
            color="white"
            text-color="black"
            flat
            label="Urutkan Berdasarkan"
            :ripple="false"
            :icon-right="show ? 'expand_less' : 'expand_more'"
            @click="show = !show"
          />
          <q-slide-transition>
            <div v-show="show">
              <div class="q-mt-md text-bold">
                Harga
                <q-range
                  v-model="rangePrice"
                  class="q-px-xs"
                  :min="10000"
                  :max="2500000"
                  track-color="grey-7"
                  thumb-size="15px"
                  track-size="4px"
                  color="primary"
                  @update:model-value="changeFormatRangePrice(rangePrice)"
                />
              </div>

              <div>
                <span class="q-ml-md" style="font-size: 0.7rem"
                  >Rp
                  <input
                    readonly
                    style="width: 30%"
                    type="text"
                    :value="rangePriceView.min" />
                  - Rp
                  <input
                    type="text"
                    readonly
                    style="width: 30%"
                    :value="rangePriceView.max"
                /></span>
              </div>
              <!-- ORIGIN START -->

              <MenuFilter
                label="Origin"
                :show="showOrigin"
                :options="optOrigin"
                @show="showOrigin = !showOrigin"
              />
              <!-- ORIGIN END -->

              <!-- SPECIES START -->
              <MenuFilter
                label="Species"
                :show="showSpecies"
                :options="optSpecies"
                @show="showSpecies = !showSpecies"
              />
              <!-- SPECIES END -->

              <!-- ROAST START -->
              <MenuFilter
                label="Roast Level"
                :show="showRoast"
                :options="optRoast"
                @show="showRoast = !showRoast"
              />
              <!-- ROAST END -->

              <!-- TASTED START -->
              <MenuFilter
                label="Tasted"
                :show="showTasted"
                :options="optTasted"
                @show="showTasted = !showTasted"
              />
              <!-- TASTED END -->

              <!-- PROCESSING START -->
              <MenuFilter
                label="Processing"
                :show="showProcessing"
                :options="optProcessing"
                @show="showProcessing = !showProcessing"
              />
              <!-- PROCESSING END -->
            </div>
          </q-slide-transition>
        </div>
        <div class="col">
          <div class="row">
            <div class="col">
              <span
                >Menampilkan
                <select
                  v-model="selectView"
                  class="q-mx-sm q-px-xs"
                  @change="onChangeView($event)"
                >
                  <option
                    v-for="opt in optView"
                    :key="opt"
                    :value="opt.value"
                    :label="opt.label"
                  ></option>
                </select>
                dari {{ dataProduct.list ? dataProduct.list.length : "" }}
              </span>
            </div>
            <div class="col text-right">
              <span
                >Urutkan
                <select
                  v-model="selectSort"
                  class="q-mx-sm q-px-xs"
                  @change="onChangeSort($event)"
                >
                  <option
                    v-for="opt in optSort"
                    :key="opt"
                    :value="opt.value"
                    :label="opt.label"
                  ></option>
                </select>
              </span>
            </div>
          </div>

          <div
            v-if="dataProduct.list && dataProduct.list.length !== 0"
            class="q-my-md"
          >
            <div class="row q-col-gutter-md">
              <div
                v-for="data in dataProduct.list"
                :key="data.id"
                class="col-4"
              >
                <ImageProduct
                  :name="data.name"
                  :type="data.product_type.name"
                  :price="formatCurrency(data.price)"
                  :image="
                    data.images.length > 0
                      ? data.images[0].image_url
                      : 'https://i.ibb.co/H4Ymyr2/folkatech.jpg'
                  "
                  @detail="toDetailProduct(data)"
                />
              </div>
            </div>
            <div class="q-pa-xl flex flex-center">
              <q-pagination
                v-model="page"
                :max="3"
                direction-links
                color="black"
                gutter="md"
              />
            </div>
          </div>
          <div v-else class="row justify-center">
            <div style="max-width: 600px" class="shadow-none q-ma-md col">
              <q-img src="../../assets/image/not-found.png"> </q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import MenuFilter from "src/components/MenuFilter.vue";
import ImageProduct from "src/components/ImageProduct.vue";

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
});

const getData = () => {
  getDataList();
};

defineExpose({
  getData,
});

const router = useRouter();
const $q = useQuasar();

const store = useStore();
const show = ref(true);
const showOrigin = ref(true);
const showSpecies = ref(true);
const showRoast = ref(true);
const showTasted = ref(true);
const showProcessing = ref(true);
const page = ref(1);

const selectView = ref(10);
const optView = ref([
  {
    label: "1",
    value: 1,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "7",
    value: 7,
  },
  {
    label: "10",
    value: 10,
  },
]);

const optOrigin = ref([
  {
    label: "Aceh",
    value: false,
    product: "8",
  },
  {
    label: "Semarang",
    value: false,
    product: "2",
  },
  {
    label: "Bandung",
    value: false,
    product: "7",
  },
  {
    label: "Jawa",
    value: false,
    product: "2",
  },
  {
    label: "Amerika Serikat",
    value: false,
    product: "6",
  },
  {
    label: "Lain - Lain",
    value: false,
    product: "8",
  },
]);

const optSpecies = ref([
  {
    label: "Arabika",
    value: false,
    product: "128",
  },
  {
    label: "Robusta",
    value: false,
    product: "23",
  },
  {
    label: "Blend",
    value: false,
    product: "9",
  },
]);

const optRoast = ref([
  {
    label: "Light Roast",
    value: false,
    product: "8",
  },
  {
    label: "Medium Roast",
    value: false,
    product: "2",
  },
  {
    label: "Dark Roast",
    value: false,
    product: "7",
  },
  {
    label: "Light to Medium Roast",
    value: false,
    product: "5",
  },
]);

const optTasted = ref([
  {
    label: "Sweet",
    value: false,
    product: "18",
  },
  {
    label: "Floral",
    value: false,
    product: "21",
  },
  {
    label: "Fruity",
    value: false,
    product: "7",
  },
  {
    label: "Nutty",
    value: false,
    product: "5",
  },
  {
    label: "Cocoa",
    value: false,
    product: "21",
  },
  {
    label: "Spices",
    value: false,
    product: "18",
  },
]);

const optProcessing = ref([
  {
    label: "Honey White",
    value: false,
    product: "8",
  },
  {
    label: "Natural",
    value: false,
    product: "2",
  },
  {
    label: "Honey Gold",
    value: false,
    product: "7",
  },
  {
    label: "Honey Yellow",
    value: false,
    product: "5",
  },
]);

const rangePrice = ref({
  min: 10000,
  max: 1000000,
});

const rangePriceView = ref({
  min: 10000,
  max: 1000000,
});

rangePriceView.value.min = rangePriceView.value.min
  .toLocaleString("id", {
    style: "currency",
    currency: "IDR",
    minminimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  .replace("Rp", "")
  .trim();

rangePriceView.value.max = rangePriceView.value.max
  .toLocaleString("id", {
    style: "currency",
    currency: "IDR",
    minminimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  .replace("Rp", "")
  .trim();

const selectSort = ref("product_name");

const optSort = ref([
  {
    label: "Nama Produk",
    value: "product_name",
  },
  {
    label: "Harga",
    value: "price",
  },
  {
    label: "Tanggal",
    value: "date",
  },
]);

// COMPUTED

const dataProduct = computed(() => store.getters["product/getDataProduct"]);

onMounted(() => {
  store.commit("product/setProductDetail", null);
  getDataList();
});

const getDataList = async () => {
  try {
    const req = {
      keyword: props.search.trim(),
      price: rangePrice.value,
      page: page.value,
      limit: selectView.value,
      order: selectSort.value,
    };
    const res = await store.dispatch("product/getList", req);
  } catch (err) {
    console.log(err);
  }
};

const onChangeView = (event) => {
  selectView.value = event.target.value;
  getDataList();
};

const onChangeSort = (event) => {
  selectSort.value = event.target.value;
  getDataList();
};

const changeFormatRangePrice = (val) => {
  rangePriceView.value.min = val.min
    .toLocaleString("id", {
      style: "currency",
      currency: "IDR",
      minminimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace("Rp", "")
    .trim();
  rangePriceView.value.max = val.max
    .toLocaleString("id", {
      style: "currency",
      currency: "IDR",
      minminimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace("Rp", "")
    .trim();
};

const formatCurrency = (val) => {
  return val
    .toLocaleString("id", {
      style: "currency",
      currency: "IDR",
      minminimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace("Rp", "")
    .trim();
};

const toDetailProduct = (val) => {
  store.commit("product/setProductDetail", val);
  router.push({ name: "detailProduct", params: { id: cleanText(val.name) } });
};

const cleanText = (val) => {
  return val.replace(/[\\"]/g, "");
};
</script>
