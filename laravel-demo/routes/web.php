<?php

use App\Http\Controllers\BandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get("/bands", [BandController::class, "showBands"])->middleware(['auth', 'verified'])->name("bands");

Route::post("band-update", [BandController::class, "updateBand"]);

Route::get("/products", [ProductController::class, "showProducts"])->middleware(['auth', 'verified'])->name("products");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/buy', [ProductController::class, "buy"]);

Route::get('/order', [OrderController::class, "showOrder"]);

require __DIR__.'/auth.php';
