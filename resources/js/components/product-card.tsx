import { ChevronsRight, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ProductCardProps = {
    title: string;
    description: string;
    price: number;
    oldPrice?: number | null;
    image?: string | null;
    properties?: Record<string, string | number> | null;
    isHit?: boolean;
    isFavorite?: boolean;
    onAddToCart?: () => void;
    onToggleFavorite?: () => void;
    className?: string;
};

const formatPrice = (value: number): string =>
    `${value.toLocaleString('ru-RU')}₽`;

export default function ProductCard({
    title,
    description,
    price,
    oldPrice = null,
    image = null,
    properties = null,
    isHit = false,
    isFavorite = false,
    onAddToCart,
    onToggleFavorite,
    className,
}: ProductCardProps) {
    const isDiscounted = oldPrice !== null && oldPrice !== undefined;
    const propertyLines = properties
        ? Object.entries(properties).map(([key, value]) => `${key}: ${value}`)
        : [];

    return (
        <article
            className={cn(
                'flex w-full max-w-[300px] flex-col rounded-[16px] border border-white bg-white p-1.5 dark:border-neutral-800 dark:bg-black',
                className,
            )}
        >
            <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl bg-white dark:bg-neutral-900">
                <img
                    src={image ?? '/images/products/no-photo.png'}
                    alt={title}
                    className="h-[150px] w-full shrink-0 object-cover"
                />

                <button
                    type="button"
                    onClick={onToggleFavorite}
                    aria-label="В избранное"
                    className="absolute top-2 left-2 text-orange-500"
                >
                    <Heart
                        className={cn('size-6', isFavorite && 'fill-orange-500')}
                    />
                </button>

                {isHit && !isDiscounted && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-gradient-to-r from-red-600 to-orange-500 px-2 py-1 text-sm uppercase font-medium text-white">
                        <Zap className="size-4" />
                        хит
                    </span>
                )}

                <div
                    className={cn(
                        'relative -mt-4 flex flex-1 flex-col rounded-xl px-2.5 pt-3 pb-2.5',
                        isDiscounted
                            ? 'bg-gradient-to-br from-red-600 to-orange-500 text-white'
                            : 'bg-gray-300 text-black dark:bg-neutral-800 dark:text-white',
                    )}
                >
                    <h3 className="text-xl leading-tight">{title}</h3>

                    <div
                        className={cn(
                            'mt-2 text-base leading-tight',
                            isDiscounted ? 'text-white/90' : 'text-[#8a8a8a] dark:text-neutral-400',
                        )}
                    >
                        <p className="line-clamp-3">{description}</p>
                        {propertyLines.map((line) => (
                            <p key={line} className="truncate">
                                {line}
                            </p>
                        ))}
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-1.5 pt-3">
                        <div className="flex flex-col">
                            {isDiscounted && (
                                <span className="text-xs text-white/80 line-through">
                                    {formatPrice(oldPrice)}
                                </span>
                            )}
                            <span
                                className={cn(
                                    'text-xl',
                                    isDiscounted && 'pl-5',
                                )}
                            >
                                {formatPrice(price)}
                            </span>
                        </div>

                        <Button onClick={onAddToCart}>
                            в корзину
                            <ChevronsRight className="" />
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
