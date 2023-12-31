<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Image;


class Item extends Model
{
    use HasFactory;
    protected $table = 'items';
    protected $fillable = [
        'city',
        'code',
        'email',
        'phone',
        'date',
        'street',
        'building',
        'description',
        'roomCount',
        'area',
        'price',
        'type',
    ];
    public function images()
    {
        return $this->hasMany(Image::class, 'item_id');
    }
}
