import { Head } from '@inertiajs/react';
import { ChevronsRight } from 'lucide-react';
import type { ReactNode } from 'react';
import CategoryCard from '@/components/category-card';
import type { CategoryCardProps } from '@/components/category-card';
import IconButton from '@/components/icon-button';
import ProductCard from '@/components/product-card';
import type { ProductCardProps } from '@/components/product-card';
import SiteHeader from '@/components/site-header';

const categories: CategoryCardProps[] = [
    { title: 'Мыши', count: 24, description: 'Игровые и офисные' },
    {
        title: 'Клавиатуры',
        count: 24,
        description: 'Механические и мембранные',
    },
    { title: 'Гарнитуры', count: 24, description: 'Проводные и беспроводные' },
    { title: 'Мониторы', count: 24, description: 'Игровые и для работы' },
];

const exampleProduct: ProductCardProps = {
    title: 'Механическая клавиатура AULA F75',
    description:
        'Механическая клавиатура геймера F75 это высококачественная клавиатура с прокладкой и пластиной ПК.',
    properties: { Подсветка: 'RGB', Подключение: 'USB-C / Bluetooth' },
    price: 4500,
};

const popularProducts: ProductCardProps[] = [
    { ...exampleProduct, isHit: true },
    { ...exampleProduct, isHit: true },
    { ...exampleProduct, price: 3900, oldPrice: 4500 },
    { ...exampleProduct, isHit: true },
];

const newProducts: ProductCardProps[] = [
    exampleProduct,
    { ...exampleProduct, price: 3900, oldPrice: 4500 },
    exampleProduct,
    exampleProduct,
];

function SectionTitle({
    children,
    action,
}: {
    children: ReactNode;
    action?: ReactNode;
}) {
    return (
        <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl text-white sm:text-3xl">{children}</h2>
            {action}
        </div>
    );
}

function ProductGrid({ products }: { products: ProductCardProps[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
                <ProductCard key={index} {...product} className="max-w-none" />
            ))}
        </div>
    );
}

export default function Welcome() {
    return (
        <>
            <Head title="Главная" />
            <div className="dark min-h-screen bg-black px-4 py-4 text-white sm:px-6">
                <div className="mx-auto flex max-w-6xl flex-col gap-12">
                    <SiteHeader />

                    <section className="relative -mt-6 flex flex-col gap-6 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-6 md:flex-row md:items-center md:p-8">
                        <span className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 text-[160px] leading-none font-bold text-white/5 select-none md:text-[240px]">
                            PRO
                        </span>
                        <div className="relative flex flex-1 flex-col gap-8">
                            <span className="text-xs tracking-wider text-neutral-400 uppercase">
                                Новинки сезона
                            </span>
                            <h1 className="text-4xl md:text-5xl">
                                LOGITECH G PRO
                            </h1>
                            <button
                                type="button"
                                className="flex w-fit items-center gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 py-2 pr-2 pl-4 text-left text-sm"
                            >
                                Беспроводная периферия для
                                <br />
                                работы и игр без компромиссов
                                <IconButton variant="white" asSpan />
                            </button>
                        </div>
                        <img
                            src="/images/products/no-photo.png"
                            alt="Logitech G PRO"
                            className="relative h-48 w-full rounded-xl object-cover md:h-64 md:w-72"
                        />
                    </section>

                    <section>
                        <SectionTitle>Популярные категории</SectionTitle>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.title}
                                    {...category}
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionTitle
                            action={
                                <button
                                    type="button"
                                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-4 py-1.5 text-sm"
                                >
                                    смотреть все
                                    <ChevronsRight className="size-4" />
                                </button>
                            }
                        >
                            Популярные товары
                        </SectionTitle>
                        <ProductGrid products={popularProducts} />
                    </section>

                    <section className="pb-8">
                        <SectionTitle>Новинки</SectionTitle>
                        <ProductGrid products={newProducts} />
                    </section>
                </div>
            </div>
        </>
    );
}
