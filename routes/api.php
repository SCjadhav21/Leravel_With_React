<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::post('/register', [ UserController::class,'create']);
// Route::get('/getuser', [ UserController::class,'index']);
Route::resource('users',UserController::class);
Route::post('addproduct',[ProductController::class, 'addProduct']);
Route::get('getproducts',[ProductController::class, 'getProducts']);
Route::delete('delete/{id}',[ProductController::class, 'deleteProduct']);