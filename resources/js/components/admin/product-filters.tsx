import { Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { AdminCategory } from '@/types/admin';

export type ProductFiltersValue = {
    search: string;
    category: string;
    onlyBestsellers: boolean;
};

export default function ProductFilters({
    categories,
    value,
    onChange,
}: {
    categories: AdminCategory[];
    value: ProductFiltersValue;
    onChange: (value: ProductFiltersValue) => void;
}) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative sm:w-72">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Поиск по названию"
                    aria-label="Поиск по названию"
                    className="pl-9"
                    value={value.search}
                    onChange={(event) =>
                        onChange({ ...value, search: event.target.value })
                    }
                />
            </div>

            <Select
                value={value.category}
                onValueChange={(category) => onChange({ ...value, category })}
            >
                <SelectTrigger
                    className="w-full sm:w-48"
                    aria-label="Категория"
                >
                    <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={String(category.id)}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="only-bestsellers"
                    checked={value.onlyBestsellers}
                    onCheckedChange={(checked) =>
                        onChange({
                            ...value,
                            onlyBestsellers: checked === true,
                        })
                    }
                />
                <Label htmlFor="only-bestsellers">Только хиты</Label>
            </div>
        </div>
    );
}
