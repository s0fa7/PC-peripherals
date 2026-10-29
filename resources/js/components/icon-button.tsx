import { ArrowDownRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type IconButtonProps = ComponentProps<'button'> & {
    variant?: 'accent' | 'white';
    asSpan?: boolean;
};

const variantClassNames = {
    accent: 'bg-gradient-to-br from-red-600 to-orange-500 text-white',
    white: 'bg-white text-red-600',
};

export default function IconButton({
    variant = 'accent',
    asSpan = false,
    className,
    children,
    type = 'button',
    ...props
}: IconButtonProps) {
    const classNames = cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-90',
        variantClassNames[variant],
        className,
    );
    const icon = children ?? <ArrowDownRight className="size-4" />;

    if (asSpan) {
        return <span className={classNames}>{icon}</span>;
    }

    return (
        <button type={type} className={classNames} {...props}>
            {icon}
        </button>
    );
}
