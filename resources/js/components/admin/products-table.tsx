import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import DataTable from '@/components/admin/data-table';
import type { DataTableColumn } from '@/components/admin/data-table';
import ProductRow from '@/components/admin/product-row';
import { Button } from '@/components/ui/button';
import { create } from '@/routes/admin/products';
import type { AdminProduct } from '@/types/admin';

const columns: DataTableColumn[] = [
    { label: 'Фото', className: 'w-16' },
    { label: 'Название' },
    { label: 'Категория', className: 'hidden md:table-cell' },
    { label: 'Цена' },
    { label: 'Скидка', className: 'hidden md:table-cell' },
    { label: 'Остаток' },
    { label: 'Хит', className: 'hidden md:table-cell' },
    { label: <span className="sr-only">Действия</span>, className: 'w-24' },
];

export default function ProductsTable({
    products,
    isLoading = false,
    onDelete,
}: {
    products: AdminProduct[];
    isLoading?: boolean;
    onDelete: (product: AdminProduct) => void;
}) {
    return (
        <DataTable
            columns={columns}
            isEmpty={products.length === 0}
            isLoading={isLoading}
            empty={
                <>
                    <p>Товаров пока нет</p>
                    <Button asChild>
                        <Link href={create()}>
                            <Plus />
                            Добавить товар
                        </Link>
                    </Button>
                </>
            }
        >
            {products.map((product) => (
                <ProductRow
                    key={product.id}
                    product={product}
                    onDelete={onDelete}
                />
            ))}
        </DataTable>
    );
}
