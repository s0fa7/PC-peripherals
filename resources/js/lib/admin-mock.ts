import type {
    AdminCategory,
    AdminOrder,
    AdminProduct,
    OrderStatus,
} from '@/types/admin';

/**
 * Временные данные для вёрстки админки. Будут заменены пропсами из контроллеров.
 */
export const mockCategories: AdminCategory[] = [
    {
        id: 1,
        name: 'Мыши',
        specs_template: {
            'Тип подключения': ['Проводная', 'Беспроводная', 'Bluetooth'],
            Подсветка: ['Есть', 'Нет'],
        },
    },
    {
        id: 2,
        name: 'Клавиатуры',
        specs_template: {
            'Тип подключения': ['Проводная', 'Беспроводная'],
            Переключатели: [
                'Мембранные',
                'Механические красные',
                'Механические синие',
            ],
            Подсветка: ['RGB', 'Белая', 'Нет'],
        },
    },
    {
        id: 3,
        name: 'Наушники',
        specs_template: {
            'Тип подключения': ['Проводная', 'Bluetooth'],
            Микрофон: ['Есть', 'Нет'],
        },
    },
];

export const mockProducts: AdminProduct[] = [
    {
        id: 1,
        category_id: 1,
        category_name: 'Мыши',
        name: 'Logitech G102 Lightsync',
        brand: 'Logitech',
        description: 'Игровая мышь с RGB-подсветкой.',
        price: 4500,
        discount: 500,
        stock: 12,
        is_bestseller: true,
        image_url: null,
        specs: { 'Тип подключения': 'Проводная', Подсветка: 'Есть' },
    },
    {
        id: 2,
        category_id: 2,
        category_name: 'Клавиатуры',
        name: 'Keychron K2 Pro',
        brand: 'Keychron',
        description: null,
        price: 12990,
        discount: null,
        stock: 0,
        is_bestseller: false,
        image_url: null,
        specs: null,
    },
    {
        id: 3,
        category_id: 3,
        category_name: 'Наушники',
        name: 'HyperX Cloud II',
        brand: 'HyperX',
        description: null,
        price: 8990,
        discount: 1000,
        stock: 5,
        is_bestseller: true,
        image_url: null,
        specs: null,
    },
];

export const mockOrders: AdminOrder[] = [
    {
        id: 12,
        created_at: '2026-10-29T10:15:00',
        user_id: 3,
        customer_name: 'Анна',
        phone: '+7 900 123-45-67',
        total: 9000,
        status: 'new',
        items: [
            {
                id: 1,
                product_name: 'Logitech G102 Lightsync',
                price: 4500,
                qty: 2,
            },
        ],
    },
    {
        id: 11,
        created_at: '2026-10-28T18:40:00',
        user_id: null,
        customer_name: 'Игорь',
        phone: '+7 911 765-43-21',
        total: 21980,
        status: 'processing',
        items: [
            { id: 2, product_name: 'Keychron K2 Pro', price: 12990, qty: 1 },
            { id: 3, product_name: 'HyperX Cloud II', price: 8990, qty: 1 },
        ],
    },
    {
        id: 10,
        created_at: '2026-10-27T12:00:00',
        user_id: 5,
        customer_name: 'Мария',
        phone: '+7 925 000-11-22',
        total: 4500,
        status: 'done',
        items: [
            {
                id: 4,
                product_name: 'Logitech G102 Lightsync',
                price: 4500,
                qty: 1,
            },
        ],
    },
    {
        id: 9,
        created_at: '2026-10-26T09:30:00',
        user_id: null,
        customer_name: 'Пётр',
        phone: '+7 999 555-44-33',
        total: 8990,
        status: 'cancelled',
        items: [
            { id: 5, product_name: 'HyperX Cloud II', price: 8990, qty: 1 },
        ],
    },
];

export const orderStatusLabels: Record<OrderStatus, string> = {
    new: 'Новый',
    processing: 'В работе',
    done: 'Выдан',
    cancelled: 'Отменён',
};

export function formatPrice(value: number): string {
    return `${value.toLocaleString('ru-RU')} ₽`;
}

export function formatDate(value: string): string {
    return new Date(value).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    });
}
