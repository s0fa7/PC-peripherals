<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'name',
        'brand',
        'specs',
        'price',
        'discount',
        'stock',
        'is_bestseller',
    ];
    protected $casts = [
        'specs' => 'array',
        'is_bestseller' => 'boolean',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function images()
    {
        return $this->hasOne(ProductImage::class);
    }
    public function getImageUrlAttribute()
    {
        return $this->image
            ? Storage::url($this->image->path)
            : asset('images/products/no-photo.png');
    }
}
