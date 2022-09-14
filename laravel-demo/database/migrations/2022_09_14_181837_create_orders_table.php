<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users");
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->timestamps();
            $table->unsignedBigInteger("order_id");
            $table->integer("product_id");
            $table->integer("quantity");
            $table->foreign("order_id")->references("id")->on("orders");
            $table->foreign("product_id")->references("id")->on("products");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};

//php artisan migrate
//php artisan migrate:rollback
