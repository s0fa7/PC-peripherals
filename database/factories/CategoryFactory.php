<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Клавиатуры',
            'Мыши',
            'Гарнитуры',
            'Мониторы',
            'Веб-камеры',
            'Коврики'
        ]);
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'specs_template' => ['Тип подключения' => fake()->randomElement(['Проводное', 'Беспроводное'])],
        ];
    }
}
