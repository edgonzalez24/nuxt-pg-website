<template>
  <div class="space-y-6">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Productos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Gestiona y organiza tu catálogo de productos
        </p>
      </div>
      <UButton
        icon="i-lucide-plus"
        label="Agregar Producto"
        color="primary"
        size="lg"
      />
    </div>

    <UTable :data="products" :columns="columns" class="flex-1" />
    <SharedPagination :total="total" :model-value="currentPage" :per-page="perPage" />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
const UBadge = resolveComponent('UBadge');
const { products, currentPage, totalPages, perPage, total } = await usePaginatedProducts();

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'images',
    header: 'Imagen',
    cell: ({ row }) => {
      const images = row.getValue('images') as string[];
      if (images.length === 0) {
        return h('span', { class: 'w-12 h-12 bg-gray-200 rounded' });
      }
      return h('img', {
        src: images[0],
        alt: 'Product Image',
        class: 'w-12 h-12 object-cover rounded',
      });
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('name'));
    },
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => {
      return h('div', { style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;max-width: 300px;', class: 'font-medium truncate-text' }, String(row.getValue('description')).slice(0, 50) + '...');
    },
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => {
      const price = row.getValue('price') as number;
      return h('div', { class: 'font-medium' }, formatCurrency(price));
    },
  },
  {
    accessorKey: 'tags',
    header: 'Etiquetas',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      if (!Array.isArray(tags) || tags.length === 0) return '-';
      return h(
        'div',
        { class: 'flex flex-wrap gap-1' },
        tags.map((tag) =>
          h(UBadge, { color: 'primary', size: 'xs', variant: 'subtle', class: 'mr-0.5' }, { default: () => tag })
        )
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de Creación',
    cell: ({ row }) => {
      return dayMonthYearFormat(new Date(row.getValue('createdAt') as string));
    },
  },
];
</script>
