export const useProduct = async (slug: string) => {
  const { data, error, execute, clear, refresh, pending } = await useFetch(`/api/product/${slug}`, {
    method: 'GET',
  });

  return {
    data,
    error,
    execute,
    clear,
    refresh,
    pending
  }
}