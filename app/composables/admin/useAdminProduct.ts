export const useAdminProduct = async(id: string) => {
  const { data: product, refresh, error, pending } = await useFetch(`/api/admin/product/${id}`);

  const createOrUpdateProduct = async (productData: Partial<Product>, files?: File[]) => {
    const isCreating = productData.id === 0;
    const formData = new FormData();

    // Append product data to formData
    formData.append('data', JSON.stringify(productData));

    try {
      if (isCreating) {
        const { product } = await $fetch("/api/admin/product", {
          method: "POST",
          body: productData,

        });
        return product;
        
      } else {
        const { product } = await $fetch(`/api/admin/product/${id}`, {
          body: formData,
          method: "PATCH",
        });

        return product;
      }
    } catch (error) {
      throw createError({
        statusCode: 400,
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }

  };
  return {
    product,
    refresh,
    error,
    pending,
    createOrUpdateProduct
  };
};