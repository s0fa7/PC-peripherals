import { Link, router } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import CategorySpecsFields from '@/components/admin/category-specs-fields';
import FormSection from '@/components/admin/form-section';
import ImageUpload from '@/components/admin/image-upload';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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
import { Spinner } from '@/components/ui/spinner';
import { index } from '@/routes/admin/products';
import type { AdminCategory, AdminProduct } from '@/types/admin';

type ProductFormData = {
    category_id: string;
    name: string;
    brand: string;
    description: string;
    price: string;
    discount: string;
    stock: string;
    is_bestseller: boolean;
    specs: Record<string, string>;
    image: File | null;
};

/**
 * Общая форма создания и редактирования товара. Пока без отправки на сервер — только вёрстка.
 */
export default function ProductForm({
    product,
    categories,
}: {
    product?: AdminProduct;
    categories: AdminCategory[];
}) {
    const [data, setData] = useState<ProductFormData>({
        category_id: product ? String(product.category_id) : '',
        name: product?.name ?? '',
        brand: product?.brand ?? '',
        description: product?.description ?? '',
        price: product ? String(product.price) : '',
        discount: product?.discount ? String(product.discount) : '',
        stock: product ? String(product.stock) : '0',
        is_bestseller: product?.is_bestseller ?? false,
        specs: product?.specs ?? {},
        image: null,
    });
    const [processing, setProcessing] = useState(false);
    const errors: Partial<Record<string, string>> = {};

    const selectedCategory = categories.find(
        (category) => String(category.id) === data.category_id,
    );

    const update = <K extends keyof ProductFormData>(
        key: K,
        value: ProductFormData[K],
    ) => setData((previous) => ({ ...previous, [key]: value }));

    const submit = (event: FormEvent) => {
        event.preventDefault();
        setProcessing(true);

        setTimeout(() => {
            setProcessing(false);
            toast.success('Товар сохранён');
            router.visit(index());
        }, 600);
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4">
            <AdminPageHeader
                title={
                    <span className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={index()} aria-label="Назад к товарам">
                                <ChevronLeft />
                            </Link>
                        </Button>
                        {product ? 'Редактирование товара' : 'Новый товар'}
                    </span>
                }
                actions={
                    <>
                        <Button variant="outline" asChild>
                            <Link href={index()}>Отмена</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}
                            Сохранить
                        </Button>
                    </>
                }
            />

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="order-first lg:order-last lg:col-span-1">
                    <FormSection title="Фото">
                        <ImageUpload
                            currentUrl={product?.image_url ?? null}
                            error={errors.image}
                            onChange={(file) => update('image', file)}
                        />
                    </FormSection>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-2">
                    <FormSection title="Основное">
                        <div className="grid gap-2">
                            <Label htmlFor="category_id">Категория</Label>
                            <Select
                                value={data.category_id}
                                onValueChange={(categoryId) =>
                                    setData((previous) => ({
                                        ...previous,
                                        category_id: categoryId,
                                        specs: {},
                                    }))
                                }
                            >
                                <SelectTrigger
                                    id="category_id"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <InputError message={errors.category_id} />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Название</Label>
                                <Input
                                    id="name"
                                    required
                                    value={data.name}
                                    onChange={(event) =>
                                        update('name', event.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="brand">Бренд</Label>
                                <Input
                                    id="brand"
                                    value={data.brand}
                                    onChange={(event) =>
                                        update('brand', event.target.value)
                                    }
                                />
                                <InputError message={errors.brand} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Описание</Label>
                            <textarea
                                id="description"
                                rows={4}
                                className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
                                value={data.description}
                                onChange={(event) =>
                                    update('description', event.target.value)
                                }
                            />
                            <InputError message={errors.description} />
                        </div>
                    </FormSection>

                    <FormSection title="Цена и остаток">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Цена, ₽</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    required
                                    value={data.price}
                                    onChange={(event) =>
                                        update('price', event.target.value)
                                    }
                                />
                                <InputError message={errors.price} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="discount">Скидка, ₽</Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={data.discount}
                                    onChange={(event) =>
                                        update('discount', event.target.value)
                                    }
                                />
                                <InputError message={errors.discount} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stock">Остаток, шт.</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min={0}
                                    required
                                    value={data.stock}
                                    onChange={(event) =>
                                        update('stock', event.target.value)
                                    }
                                />
                                <InputError message={errors.stock} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_bestseller"
                                checked={data.is_bestseller}
                                onCheckedChange={(checked) =>
                                    update('is_bestseller', checked === true)
                                }
                            />
                            <Label htmlFor="is_bestseller">Хит продаж</Label>
                        </div>
                    </FormSection>

                    <FormSection title="Характеристики">
                        <CategorySpecsFields
                            template={
                                selectedCategory
                                    ? (selectedCategory.specs_template ?? {})
                                    : null
                            }
                            values={data.specs}
                            errors={errors}
                            onChange={(specs) => update('specs', specs)}
                        />
                    </FormSection>
                </div>
            </div>
        </form>
    );
}
