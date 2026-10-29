import { formatPrice } from '@/lib/admin-mock';
import type { AdminOrderItem } from '@/types/admin';

export default function OrderItemsList({ items }: { items: AdminOrderItem[] }) {
    return (
        <div className="rounded-lg border bg-muted/30 p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground uppercase">
                Состав заказа
            </p>
            <ul className="divide-y text-sm">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2"
                    >
                        <span className="font-medium">{item.product_name}</span>
                        <span className="flex gap-4 text-muted-foreground tabular-nums">
                            <span>
                                {formatPrice(item.price)} × {item.qty}
                            </span>
                            <span className="font-medium text-foreground">
                                {formatPrice(item.price * item.qty)}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
