<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['name', 'slug', 'specs_template'];
    protected $casts = ['specs_template' => 'array'];
    public function products(){
        return $this->hasMany(Product::class);
    }
}
