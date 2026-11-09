<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'contact_name',
        'contact_role',
        'brand_name',
        'shop_link',
        'category',
        'stage',
        'monthly_gmv',
        'marketing_budget',
        'services',
        'goal',
        'email',
        'mobile',
        'start_when',
        'source',
        'referred_by',
        'source_detail',
        'suggested_package',
        'match_score',
        'status',
    ];

    protected $casts = [
        'services' => 'array',
        'match_score' => 'integer',
    ];
}
