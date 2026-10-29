import IconButton from '@/components/icon-button';

export type CategoryCardProps = {
    title: string;
    count: number;
    description: string;
    onOpen?: () => void;
};

export default function CategoryCard({
    title,
    count,
    description,
    onOpen,
}: CategoryCardProps) {
    return (
        <div className="relative h-36 rounded-3xl bg-neutral-900 p-4">
            <span className="absolute top-4 right-4 size-1.5 rounded-full bg-orange-500" />
            <h3 className="text-lg">{title}</h3>
            <p className="text-xs text-orange-500">{count}</p>
            <p className="mt-1 max-w-[110px] text-xs leading-tight text-neutral-400">
                {description}
            </p>
            <div className="absolute bottom-0 left-0 rounded-tr-3xl bg-black pt-2 pr-2">
                <IconButton aria-label={title} onClick={onOpen} />
            </div>
        </div>
    );
}
