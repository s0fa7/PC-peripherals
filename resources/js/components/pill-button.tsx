import { ChevronsRight } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'pink' | 'white';
};

export default function PillButton({
    variant = 'pink',
    className,
    children,
    type = 'button',
    ...props
}: PillButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xl leading-none transition-opacity hover:opacity-90',
                variant === 'white'
                    ? 'bg-white text-[#e8458b]'
                    : 'bg-[#e8458b] text-white',
                className,
            )}
            {...props}
        >
            <span className="pb-[0.1em]">{children}</span>
            <ChevronsRight className="size-[0.9em] shrink-0" />
        </button>
    );
}
