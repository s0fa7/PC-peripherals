<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Администратор',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Покупатель',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        $data = [
            [
                'name' => 'Клавиатуры',
                'slug' => 'keyboards',
                'specs' => [
                    'Тип подключения' => ['Проводное', 'Беспроводное'],
                    'Переключатели' => ['Механические', 'Мембранные'],
                    'Подсветка' => ['RGB', 'Одноцветная', 'Нет'],
                ],
            ],
            [
                'name' => 'Мыши',
                'slug' => 'mice',
                'specs' => [
                    'Тип подключения' => ['Проводное', 'Беспроводное'],
                    'DPI' => ['800', '1600', '3200', '6400'],
                    'Назначение' => ['Игровая', 'Офисная'],
                ],
            ],
            [
                'name' => 'Мониторы',
                'slug' => 'monitors',
                'specs' => [
                    'Диагональ' => ['24"', '27"', '32"'],
                    'Разрешение' => ['1920x1080', '2560x1440', '3840x2160'],
                    'Частота обновления' => ['60 Гц', '144 Гц', '165 Гц'],
                ],
            ],
        ];


        foreach ($data as $item) {
            $category = Category::create([
                'name' => $item['name'],
                'slug' => $item['slug'],
                'specs_template' => $item['specs'],
            ]);

            for ($i = 0; $i < 10; $i++) {
                $specs = [];
                foreach ($item['specs'] as $field => $options) {
                    $specs[$field] = fake()->randomElement($options);
                }

                Product::factory()->create([
                    'category_id' => $category->id,
                    'specs' => $specs,
                ]);
            }
        }
    }
}