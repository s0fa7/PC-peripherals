import { Link, usePage } from '@inertiajs/react';
import { Heart, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';

const pillClassName =
    'flex h-9 items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 text-sm text-white transition-colors hover:bg-neutral-800';

export default function SiteHeader() {
    const { auth } = usePage().props;

    return (
        <header className="flex items-center justify-center gap-2">
            <Link
                href="/"
                className={cn(pillClassName, 'font-bold tracking-widest')}
            >
                SRF
            </Link>
            <button
                type="button"
                className={cn(
                    pillClassName,
                    'border-transparent bg-gradient-to-r from-red-600 to-orange-500',
                )}
            >
                <LayoutGrid className="size-4" />
                Каталог
            </button>
            <div className={pillClassName}>
                <button type="button" aria-label="Корзина">
                    <ShoppingBag className="size-4" />
                </button>
                <button type="button" aria-label="Избранное">
                    <Heart className="size-4" />
                </button>
                {auth.user ? (
                    <Link href={dashboard()} aria-label="Кабинет">
                        <User className="size-4" />
                    </Link>
                ) : (
                    <>
                        <Link href={login()} className="hover:text-orange-400">
                            Войти
                        </Link>
                        <Link
                            href={register()}
                            className="hidden hover:text-orange-400 sm:inline"
                        >
                            Регистрация
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
