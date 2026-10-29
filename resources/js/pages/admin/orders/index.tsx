import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import AdminPageHeader from '@/components/admin/admin-page-header';
import OrdersTable from '@/components/admin/orders-table';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { mockOrders, orderStatusLabels } from '@/lib/admin-mock';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/orders';

export default function AdminOrdersIndex() {
    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');

    const normalizedSearch = search.trim().toLowerCase();
    const visibleOrders = mockOrders.filter(
        (order) =>
            (status === 'all' || order.status === status) &&
            (order.customer_name.toLowerCase().includes(normalizedSearch) ||
                order.phone.includes(normalizedSearch)),
    );

    return (
        <>
            <Head title="Заказы" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <AdminPageHeader title="Заказы" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger
                            className="w-full sm:w-44"
                            aria-label="Статус"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все статусы</SelectItem>
                            {Object.entries(orderStatusLabels).map(
                                ([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ),
                            )}
                        </SelectContent>
                    </Select>

                    <div className="relative sm:w-72">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Поиск по имени или телефону"
                            aria-label="Поиск по имени или телефону"
                            className="pl-9"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </div>

                <OrdersTable orders={visibleOrders} />
            </div>
        </>
    );
}

AdminOrdersIndex.layout = {
    breadcrumbs: [
        { title: 'Обзор', href: dashboard() },
        { title: 'Заказы', href: index() },
    ],
};
