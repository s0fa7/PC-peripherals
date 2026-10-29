import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import OrderItemsList from '@/components/admin/order-items-list';
import OrderStatusSelect from '@/components/admin/order-status-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, formatPrice } from '@/lib/admin-mock';
import { cn } from '@/lib/utils';
import type { AdminOrder } from '@/types/admin';

function CustomerName({ order }: { order: AdminOrder }) {
    return (
        <>
            {order.customer_name}
            {order.user_id === null && (
                <span className="ml-1 text-xs text-muted-foreground">
                    (Гость)
                </span>
            )}
        </>
    );
}

function ExpandButton({
    isOpen,
    onToggle,
}: {
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Скрыть состав' : 'Показать состав'}
            onClick={onToggle}
        >
            <ChevronDown
                className={cn('transition-transform', isOpen && 'rotate-180')}
            />
        </Button>
    );
}

/**
 * Строка заказа для таблицы (md и шире).
 */
export default function OrderRow({ order }: { order: AdminOrder }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr className={cn('hover:bg-muted/40', isOpen && 'border-b-0!')}>
                <td className="p-3 font-medium tabular-nums">{order.id}</td>
                <td className="p-3 tabular-nums">
                    {formatDate(order.created_at)}
                </td>
                <td className="p-3">
                    <CustomerName order={order} />
                </td>
                <td className="p-3 whitespace-nowrap">
                    <a
                        href={`tel:${order.phone.replace(/[^\d+]/g, '')}`}
                        className="underline-offset-4 hover:underline"
                    >
                        {order.phone}
                    </a>
                </td>
                <td className="p-3 whitespace-nowrap tabular-nums">
                    {formatPrice(order.total)}
                </td>
                <td className="p-3">
                    <OrderStatusSelect
                        status={order.status}
                        orderId={order.id}
                    />
                </td>
                <td className="p-3 text-right">
                    <ExpandButton
                        isOpen={isOpen}
                        onToggle={() => setIsOpen(!isOpen)}
                    />
                </td>
            </tr>
            {isOpen && (
                <tr>
                    <td colSpan={7} className="px-3 pb-3">
                        <OrderItemsList items={order.items} />
                    </td>
                </tr>
            )}
        </>
    );
}

/**
 * Карточка заказа для телефона (уже md).
 */
export function OrderCard({ order }: { order: AdminOrder }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="gap-3 py-4">
            <CardContent className="grid gap-3 px-4 text-sm">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="font-medium">
                            №{order.id} · {formatDate(order.created_at)}
                        </p>
                        <p className="text-muted-foreground">
                            <CustomerName order={order} />
                        </p>
                    </div>
                    <p className="font-semibold tabular-nums">
                        {formatPrice(order.total)}
                    </p>
                </div>
                <a
                    href={`tel:${order.phone.replace(/[^\d+]/g, '')}`}
                    className="w-fit underline underline-offset-4"
                >
                    {order.phone}
                </a>
                <div className="flex items-center justify-between gap-2">
                    <OrderStatusSelect
                        status={order.status}
                        orderId={order.id}
                    />
                    <ExpandButton
                        isOpen={isOpen}
                        onToggle={() => setIsOpen(!isOpen)}
                    />
                </div>
                {isOpen && <OrderItemsList items={order.items} />}
            </CardContent>
        </Card>
    );
}
