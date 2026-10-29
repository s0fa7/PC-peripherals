import type { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type DataTableColumn = {
    label: ReactNode;
    className?: string;
};

/**
 * Обёртка над <table>: шапка, состояние загрузки (Skeleton) и пустое состояние.
 */
export default function DataTable({
    columns,
    isEmpty,
    isLoading = false,
    loadingRows = 5,
    empty,
    className,
    children,
}: {
    columns: DataTableColumn[];
    isEmpty: boolean;
    isLoading?: boolean;
    loadingRows?: number;
    empty?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    if (!isLoading && isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                {empty ?? 'Нет данных'}
            </div>
        );
    }

    return (
        <div
            className={cn(
                'overflow-x-auto rounded-xl border bg-card text-card-foreground',
                className,
            )}
        >
            <table className="w-full text-sm">
                <thead className="border-b bg-muted/50 text-left text-muted-foreground">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={cn(
                                    'h-10 px-3 font-medium whitespace-nowrap',
                                    column.className,
                                )}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0">
                    {isLoading
                        ? Array.from({ length: loadingRows }).map((_, row) => (
                              <tr key={row}>
                                  {columns.map((column, index) => (
                                      <td
                                          key={index}
                                          className={cn(
                                              'p-3',
                                              column.className,
                                          )}
                                      >
                                          <Skeleton className="h-4 w-full" />
                                      </td>
                                  ))}
                              </tr>
                          ))
                        : children}
                </tbody>
            </table>
        </div>
    );
}
