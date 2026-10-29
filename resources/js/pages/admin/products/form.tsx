import { Head } from '@inertiajs/react';
import ProductForm from '@/components/admin/product-form';
import { mockCategories, mockProducts } from '@/lib/admin-mock';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/products';

export default function AdminProductForm({
    productId,
}: {
    productId?: number;
}) {
    const product = mockProducts.find((item) => item.id === productId);

    return (
        <>
            <Head title={product ? 'Редактирование товара' : 'Новый товар'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <ProductForm
                    key={product?.id ?? 'new'}
                    product={product}
                    categories={mockCategories}
                />
            </div>
        </>
    );
}

AdminProductForm.layout = {
    breadcrumbs: [
        { title: 'Обзор', href: dashboard() },
        { title: 'Товары', href: index() },
        { title: 'Товар', href: index() },
    ],
};
