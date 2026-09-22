<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'brand_name',
        'contact_name',
        'email',
        'tiktok_handle',
        'monthly_gmv',
        'category',
        'services',
        'referral',
        'message',
        'status',
    ];

    protected $casts = [
        'services' => 'array',
    ];
}
