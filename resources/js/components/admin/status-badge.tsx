import { Badge } from '@/components/ui/badge';
import { orderStatusLabels } from '@/lib/admin-mock';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types/admin';

const statusClasses: Record<OrderStatus, string> = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300',
    processing:
        'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300',
    done: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300',
    cancelled: 'bg-muted text-muted-foreground',
};

export default function StatusBadge({
    status,
    className,
}: {
    status: OrderStatus;
    className?: string;
}) {
    return (
        <Badge
            variant="outline"
            className={cn(
                'border-transparent',
                statusClasses[status],
                className,
            )}
        >
            {orderStatusLabels[status]}
        </Badge>
    );
}
