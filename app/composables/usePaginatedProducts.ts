export const usePaginatedProducts = async() => {
  const route = useRoute();
  const page = computed(() => {
    const pageParams = route.query.page as string;
    const pageNumber = parseInt(pageParams, 10);
    return isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
  });

  const limit = computed(() => {
    const limitParams = route.query.limit as string;
    return isNaN(+limitParams) ? 10 : +limitParams;
  });

  const offset = computed(() => (page.value - 1) * limit.value);

  const { data, error, refresh } = await useFetch('/api/products', {
    method: 'GET',
    query: {
      limit,
      offset,
    },
  });

  return {
    products: computed(() => data.value?.products || []),
    totalPages: computed(() => data.value?.totalPages || 0),
    currentPage: computed(() => data.value?.currentPage || 1),
    perPage: computed(() => data.value?.perPage || 10),
    total: computed(() => data.value?.total || 0),
    error,
    refresh,
  };
}