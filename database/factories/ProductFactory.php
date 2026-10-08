<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        $brand = fake()->randomElement(['Logitech', 'Razer', 'HyperX', 'Keychron', 'SteelSeries']);

        return [
            'brand' => $brand,
            'name' => $brand . ' ' . strtoupper(fake()->bothify('??-###')),
            'price' => fake()->numberBetween(1000, 60000),
            'discount' => fake()->boolean(30) ? fake()->numberBetween(500, 3000) : null,
            'stock' => fake()->numberBetween(0, 50),
            'is_bestseller' => fake()->boolean(20),
        ];
    }
}
