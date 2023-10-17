<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class Image extends Model
{
    use HasFactory;
    protected $table = 'images';
    protected $fillable = [
        'url', 'item_id'
    ];
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
