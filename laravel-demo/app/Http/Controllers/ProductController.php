<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class ProductController extends Controller
{
    public function showProducts()
    {
        $products = Product::all();
        return Inertia::render('Products', ["products" => $products, "csrf_token" => csrf_token()]);
    }

    public function buy(Request $request)
    {
        $basket = $request->basket;
        OrderController::createOrder($basket);
        foreach($basket as $product){
            Product::where("id", $product["id"])->update(["stock_quantity" => $product["stockquantity"]]);
        }
    }
}
