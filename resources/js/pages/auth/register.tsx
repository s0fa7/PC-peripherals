import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Регистрация" />
            <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Имя</Label>
                            <Input id="name" name="name" required autoFocus autoComplete="name" />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" required autoComplete="email" />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Пароль</Label>
                            <PasswordInput id="password" name="password" required autoComplete="new-password" />
                            <InputError message={errors.password} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Повторите пароль</Label>
                            <PasswordInput id="password_confirmation" name="password_confirmation" required autoComplete="new-password" />
                        </div>
                        <Button type="submit" className="mt-2 w-full" disabled={processing}>
                            {processing && <Spinner />}
                            Зарегистрироваться
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Уже есть аккаунт? <TextLink href={login()}>Войти</TextLink>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Создать аккаунт',
    description: 'Введите данные для регистрации',
};