export type SpecsTemplate = Record<string, string[]>;

export type AdminCategory = {
    id: number;
    name: string;
    specs_template: SpecsTemplate | null;
};

export type AdminProduct = {
    id: number;
    category_id: number;
    category_name: string;
    name: string;
    brand: string | null;
    description: string | null;
    price: number;
    discount: number | null;
    stock: number;
    is_bestseller: boolean;
    image_url: string | null;
    specs: Record<string, string> | null;
};

export type OrderStatus = 'new' | 'processing' | 'done' | 'cancelled';

export type AdminOrderItem = {
    id: number;
    product_name: string;
    price: number;
    qty: number;
};

export type AdminOrder = {
    id: number;
    created_at: string;
    user_id: number | null;
    customer_name: string;
    phone: string;
    total: number;
    status: OrderStatus;
    items: AdminOrderItem[];
};
