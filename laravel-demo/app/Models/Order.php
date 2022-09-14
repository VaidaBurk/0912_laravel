<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    protected $table = "orders";
    protected $primaryKey = "id";
    public $incrementing = true;
}

//php artisan make:model Order