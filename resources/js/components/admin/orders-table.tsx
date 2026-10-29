import DataTable from '@/components/admin/data-table';
import type { DataTableColumn } from '@/components/admin/data-table';
import OrderRow, { OrderCard } from '@/components/admin/order-row';
import { Skeleton } from '@/components/ui/skeleton';
import type { AdminOrder } from '@/types/admin';

const columns: DataTableColumn[] = [
    { label: '№', className: 'w-14' },
    { label: 'Дата' },
    { label: 'Клиент' },
    { label: 'Телефон' },
    { label: 'Сумма' },
    { label: 'Статус' },
    { label: <span className="sr-only">Состав</span>, className: 'w-12' },
];

export default function OrdersTable({
    orders,
    isLoading = false,
}: {
    orders: AdminOrder[];
    isLoading?: boolean;
}) {
    return (
        <>
            <div className="hidden md:block">
                <DataTable
                    columns={columns}
                    isEmpty={orders.length === 0}
                    isLoading={isLoading}
                    empty="Заказов пока нет"
                >
                    {orders.map((order) => (
                        <OrderRow key={order.id} order={order} />
                    ))}
                </DataTable>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-32 rounded-xl" />
                    ))
                ) : orders.length === 0 ? (
                    <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                        Заказов пока нет
                    </p>
                ) : (
                    orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))
                )}
            </div>
        </>
    );
}
