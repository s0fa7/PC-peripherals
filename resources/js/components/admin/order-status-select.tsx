import { useState } from 'react';
import { toast } from 'sonner';
import StatusBadge from '@/components/admin/status-badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { orderStatusLabels } from '@/lib/admin-mock';
import type { OrderStatus } from '@/types/admin';

const statuses = Object.keys(orderStatusLabels) as OrderStatus[];

/**
 * Смена статуса прямо в строке: выбор сразу «отправляет» запрос (пока заглушка).
 */
export default function OrderStatusSelect({
    status,
    orderId,
}: {
    status: OrderStatus;
    orderId: number;
}) {
    const [current, setCurrent] = useState(status);

    const change = (next: OrderStatus) => {
        setCurrent(next);
        toast.success('Статус обновлён');
    };

    return (
        <Select value={current} onValueChange={change}>
            <SelectTrigger
                size="sm"
                className="w-36"
                aria-label={`Статус заказа №${orderId}`}
            >
                <StatusBadge status={current} />
            </SelectTrigger>
            <SelectContent>
                {statuses.map((option) => (
                    <SelectItem key={option} value={option}>
                        <StatusBadge status={option} />
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
