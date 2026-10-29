import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

/**
 * Принимает массив links из Laravel-пагинатора (первый и последний — «назад» и «вперёд»).
 */
export default function Pagination({ links }: { links: PaginationLink[] }) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav
            aria-label="Пагинация"
            className="flex flex-wrap items-center justify-center gap-1"
        >
            {links.map((link, index) => {
                const isPrevious = index === 0;
                const isNext = index === links.length - 1;
                const ariaLabel = isPrevious
                    ? 'Предыдущая страница'
                    : isNext
                      ? 'Следующая страница'
                      : undefined;
                const content = isPrevious ? (
                    <ChevronLeft />
                ) : isNext ? (
                    <ChevronRight />
                ) : (
                    link.label
                );

                if (!link.url) {
                    return (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            disabled
                            aria-label={ariaLabel}
                        >
                            {content}
                        </Button>
                    );
                }

                return (
                    <Button
                        key={index}
                        variant={link.active ? 'outline' : 'ghost'}
                        size="icon"
                        asChild
                    >
                        <Link
                            href={link.url}
                            preserveScroll
                            aria-label={ariaLabel}
                            aria-current={link.active ? 'page' : undefined}
                        >
                            {content}
                        </Link>
                    </Button>
                );
            })}
        </nav>
    );
}
