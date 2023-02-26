<template>
  <q-card class="cursor-pointer links" @click="$emit('detail')">
    <img :src="image" />
    <q-card-section class="text-center">
      <div class="text-bold ellipsis">{{ cleanText(name) }}</div>
      <div>{{ type }}</div>
      <div>
        <q-rating
          :model-value="ratingModel"
          readonly
          size="1em"
          style="color: #ffc107"
        />
        <span style="font-size: 0.65rem"> (7)</span>
      </div>
      <div class="text-primary text-bold" style="font-size: 1rem">
        Rp {{ price }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  ratingModel: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["detail"]);

const cleanText = (val) => {
  return val.replace(/[\\"]/g, "");
};
</script>

<style scoped>
.links:hover {
  box-shadow: 0 0 1rem;
}
</style>
