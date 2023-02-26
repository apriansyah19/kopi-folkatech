<template>
  <q-btn
    align="between"
    class="full-width text-bold q-mt-md q-mb-sm q-px-none q-pl-xs shadow-1"
    text-color="black"
    style="background-color: #f5f5f5"
    :label="label"
    no-caps
    :ripple="false"
    :icon-right="show ? 'expand_less' : 'expand_more'"
    @click="$emit('show')"
  />
  <q-slide-transition>
    <div v-show="show">
      <div v-for="opt in options" :key="opt" class="row q-mb-sm">
        <div class="col-10">
          <input id="myCheck" type="checkbox" class="q-mr-sm" />
          {{ opt.label }}
        </div>
        <div class="col text-right">({{ opt.product }})</div>
      </div>
    </div>
  </q-slide-transition>
</template>

<script setup>
const emit = defineEmits(["show"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
