import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import Pagination from '@/components/admin/pagination';
import ProductFilters from '@/components/admin/product-filters';
import type { ProductFiltersValue } from '@/components/admin/product-filters';
import ProductsTable from '@/components/admin/products-table';
import { Button } from '@/components/ui/button';
import { mockCategories, mockProducts } from '@/lib/admin-mock';
import { dashboard } from '@/routes/admin';
import { create, index } from '@/routes/admin/products';

export default function AdminProductsIndex() {
    const [products, setProducts] = useState(mockProducts);
    const [filters, setFilters] = useState<ProductFiltersValue>({
        search: '',
        category: 'all',
        onlyBestsellers: false,
    });

    const visibleProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            (filters.category === 'all' ||
                String(product.category_id) === filters.category) &&
            (!filters.onlyBestsellers || product.is_bestseller),
    );

    return (
        <>
            <Head title="Товары" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <AdminPageHeader
                    title="Товары"
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus />
                                Добавить товар
                            </Link>
                        </Button>
                    }
                />

                <ProductFilters
                    categories={mockCategories}
                    value={filters}
                    onChange={setFilters}
                />

                <ProductsTable
                    products={visibleProducts}
                    onDelete={(deleted) => {
                        setProducts(
                            products.filter(
                                (product) => product.id !== deleted.id,
                            ),
                        );
                        toast.success('Товар удалён');
                    }}
                />

                <Pagination
                    links={[
                        { url: null, label: '‹', active: false },
                        { url: index.url(), label: '1', active: true },
                        {
                            url: index.url({ query: { page: 2 } }),
                            label: '2',
                            active: false,
                        },
                        {
                            url: index.url({ query: { page: 2 } }),
                            label: '›',
                            active: false,
                        },
                    ]}
                />
            </div>
        </>
    );
}

AdminProductsIndex.layout = {
    breadcrumbs: [
        { title: 'Обзор', href: dashboard() },
        { title: 'Товары', href: index() },
    ],
};
