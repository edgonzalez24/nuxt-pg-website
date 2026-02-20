<script lang="ts" setup>

const props = defineProps<{
  slug: string;
}>();
const { data, status } = await useFetch(`/api/product/${props.slug}/suggestions`, {
  lazy: true,
  server: false,
  cache: 'force-cache'
});
const suggestions = computed(() => data.value?.suggestions || []);

</script>
<template>
  <div class="mt-12">
    <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <USkeleton v-for="n in 3" :key="n" class="w-full h-52 rounded-md mb-4" />
    </div>
    <ProductsGrid v-else :products="suggestions || []" />
  </div>
</template>