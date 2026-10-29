import { ImageUp, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

const placeholderImage = '/images/products/no-photo.png';

export default function ImageUpload({
    currentUrl,
    error,
    onChange,
}: {
    currentUrl: string | null;
    error?: string;
    onChange: (file: File | null) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl);

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const selectFile = (file: File | undefined) => {
        if (!file) {
            return;
        }

        setPreviewUrl(URL.createObjectURL(file));
        onChange(file);
    };

    const removeFile = () => {
        setPreviewUrl(null);
        onChange(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="grid gap-3">
            <img
                src={previewUrl ?? placeholderImage}
                alt="Превью фото товара"
                className="aspect-square w-full rounded-lg border bg-muted object-cover"
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => selectFile(event.target.files?.[0])}
            />

            <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
            >
                <ImageUp />
                Загрузить фото
            </Button>

            {previewUrl && (
                <Button
                    type="button"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={removeFile}
                >
                    <Trash2 />
                    Удалить фото
                </Button>
            )}

            <InputError message={error} />
        </div>
    );
}
