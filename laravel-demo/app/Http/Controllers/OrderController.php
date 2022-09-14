<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    public static function createOrder($products) {
        $order = new Order();
        $order->user_id = Auth::id();
        $order->save();

        foreach($products as $product) {
            $orderItem = new OrderItem();
            $orderItem->product_id= $product["id"];
            $orderItem->order_id = $order->id;
            $orderItem->quantity = $product["quantity"];
            $orderItem->save();
        }
    }

    public function showOrder(Request $request) {
        $query = $request->query();
        if(isset($query["id"])) {
            $id = $query["id"];
            $order = Order::where("id", $id)->first();

            // checking if user owns the order, if not, he is redirected to main page
            if (!($order->user_id === Auth::id())) {
                // return Redirect::route("products");
                return redirect("/");
            }

            $email = DB::table("users")->where('id', '=', $order->user_id)->select("email")->get()->first()->email;
            $order->user_email = $email;
            $orderItems = OrderItem::where("order_id", $id)->get();
            $orderProducts = [];
            
            foreach($orderItems as $item) {
                $product = Product::where("id", $item->product_id)->get()->first();
                $orderProduct = (object)[];
                $orderProduct->id = $product->id;
                $orderProduct->name = $product->name;
                $orderProduct->quantity = $item->quantity;
                array_push($orderProducts, $orderProduct);
            }
            return view('order', ['order' => $order, 'order_items' => $orderProducts]);
        }
    }
}

//php artisan make:controller OrderController