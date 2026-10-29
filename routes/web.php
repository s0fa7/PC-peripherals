<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::inertia('/', 'admin/dashboard')->name('admin.dashboard');
    Route::inertia('products', 'admin/products/index')->name('admin.products.index');
    Route::inertia('products/create', 'admin/products/form')->name('admin.products.create');
    Route::get('products/{product}/edit', fn (int $product) => inertia('admin/products/form', ['productId' => $product]))
        ->whereNumber('product')
        ->name('admin.products.edit');
    Route::inertia('orders', 'admin/orders/index')->name('admin.orders.index');
});

require __DIR__.'/settings.php';
