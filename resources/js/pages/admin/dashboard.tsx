import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Package, ShoppingCart, Wallet } from 'lucide-react';
import AdminPageHeader from '@/components/admin/admin-page-header';
import DataTable from '@/components/admin/data-table';
import StatCard from '@/components/admin/stat-card';
import StatusBadge from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import {
    formatDate,
    formatPrice,
    mockOrders,
    mockProducts,
} from '@/lib/admin-mock';
import { dashboard } from '@/routes/admin';
import { index as ordersIndex } from '@/routes/admin/orders';

const recentOrderColumns = [
    { label: '№' },
    { label: 'Дата' },
    { label: 'Клиент' },
    { label: 'Сумма' },
    { label: 'Статус' },
];

export default function AdminDashboard() {
    const recentOrders = mockOrders.slice(0, 5);
    const newOrdersCount = mockOrders.filter(
        (order) => order.status === 'new',
    ).length;
    const ordersTotal = mockOrders
        .filter((order) => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.total, 0);

    return (
        <>
            <Head title="Обзор" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <AdminPageHeader title="Обзор" />

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <StatCard
                        label="Товаров"
                        value={mockProducts.length}
                        icon={Package}
                    />
                    <StatCard
                        label="Новых заказов"
                        value={newOrdersCount}
                        icon={ShoppingCart}
                    />
                    <StatCard
                        label="Сумма заказов"
                        value={formatPrice(ordersTotal)}
                        icon={Wallet}
                    />
                </div>

                <section className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="font-semibold">Последние заказы</h2>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={ordersIndex()}>
                                Все заказы
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>

                    <DataTable
                        columns={recentOrderColumns}
                        isEmpty={recentOrders.length === 0}
                        empty="Заказов пока нет"
                    >
                        {recentOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="p-3 font-medium tabular-nums">
                                    {order.id}
                                </td>
                                <td className="p-3 tabular-nums">
                                    {formatDate(order.created_at)}
                                </td>
                                <td className="p-3">{order.customer_name}</td>
                                <td className="p-3 whitespace-nowrap tabular-nums">
                                    {formatPrice(order.total)}
                                </td>
                                <td className="p-3">
                                    <StatusBadge status={order.status} />
                                </td>
                            </tr>
                        ))}
                    </DataTable>
                </section>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Обзор',
            href: dashboard(),
        },
    ],
};
