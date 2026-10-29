import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { SpecsTemplate } from '@/types/admin';

/**
 * Поля характеристик, построенные из specs_template выбранной категории.
 */
export default function CategorySpecsFields({
    template,
    values,
    errors = {},
    onChange,
}: {
    template: SpecsTemplate | null;
    values: Record<string, string>;
    errors?: Record<string, string | undefined>;
    onChange: (values: Record<string, string>) => void;
}) {
    if (!template) {
        return (
            <p className="text-sm text-muted-foreground">Выберите категорию</p>
        );
    }

    const fields = Object.entries(template);

    if (fields.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                У этой категории нет характеристик
            </p>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([field, options], index) => {
                const id = `spec-${index}`;

                return (
                    <div key={field} className="grid gap-2">
                        <Label htmlFor={id}>{field}</Label>
                        <Select
                            value={values[field] ?? ''}
                            onValueChange={(option) =>
                                onChange({ ...values, [field]: option })
                            }
                        >
                            <SelectTrigger id={id} className="w-full">
                                <SelectValue placeholder="Не выбрано" />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors[`specs.${field}`]} />
                    </div>
                );
            })}
        </div>
    );
}
