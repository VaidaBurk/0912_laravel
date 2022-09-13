<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function showProducts()
    {
        $products = Product::all();
        return Inertia::render('Products', ["products"=>$products, "csrf_token"=>csrf_token()]);
    }

    public function buy(Request $request){
        $basket = $request->basket;
        foreach($basket as $product){
            Product::where("id", $product["id"])->update(["stock_quantity"=>$product["quantity"]]);
        }
    }
}
