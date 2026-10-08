<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public const UPDATE_AT = null;

    protected $fillable = [
    'user_id', 'customer_name', 'email',
    'total', 'status',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
