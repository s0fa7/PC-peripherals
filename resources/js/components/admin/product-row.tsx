import { Link } from '@inertiajs/react';
import { Pencil, Star, Trash2 } from 'lucide-react';
import DeleteConfirmDialog from '@/components/admin/delete-confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatPrice } from '@/lib/admin-mock';
import { edit } from '@/routes/admin/products';
import type { AdminProduct } from '@/types/admin';

export default function ProductRow({
    product,
    onDelete,
}: {
    product: AdminProduct;
    onDelete: (product: AdminProduct) => void;
}) {
    return (
        <tr className="hover:bg-muted/40">
            <td className="p-3">
                <img
                    src={product.image_url ?? '/images/products/no-photo.png'}
                    alt=""
                    className="size-10 rounded-md border object-cover"
                />
            </td>
            <td className="p-3 font-medium">
                <div className="max-w-64 truncate">{product.name}</div>
                {product.brand && (
                    <div className="text-xs text-muted-foreground">
                        {product.brand}
                    </div>
                )}
            </td>
            <td className="hidden p-3 text-muted-foreground md:table-cell">
                {product.category_name}
            </td>
            <td className="p-3 whitespace-nowrap tabular-nums">
                {formatPrice(product.price)}
            </td>
            <td className="hidden p-3 tabular-nums md:table-cell">
                {product.discount ? formatPrice(product.discount) : '—'}
            </td>
            <td className="p-3 tabular-nums">
                {product.stock > 0 ? (
                    product.stock
                ) : (
                    <Badge variant="destructive">нет в наличии</Badge>
                )}
            </td>
            <td className="hidden p-3 md:table-cell">
                {product.is_bestseller && (
                    <Star
                        className="size-4 fill-amber-400 text-amber-400"
                        aria-label="Хит продаж"
                    />
                )}
            </td>
            <td className="p-3">
                <div className="flex justify-end gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild>
                                <Link
                                    href={edit(product.id)}
                                    aria-label="Изменить"
                                >
                                    <Pencil />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Изменить</TooltipContent>
                    </Tooltip>

                    <DeleteConfirmDialog
                        title="Удалить товар?"
                        onConfirm={() => onDelete(product)}
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Удалить"
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 />
                            </Button>
                        }
                    />
                </div>
            </td>
        </tr>
    );
}
