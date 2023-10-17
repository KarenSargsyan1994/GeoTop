<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use app\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthController;
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

Route::post('login', [AuthController::class,'login']);
Route::get('/items',[ItemController::class, 'index']);
Route::get('/items/{id}',[ItemController::class, 'show']);

Route::group(['middleware' => ['jwt.verify:admin']], function () {
Route::get('/user', [AuthController::class, 'me']);
Route::post('/item',[ItemController::class, 'store']);
Route::put('/items/{id}',[ItemController::class, 'update']);
Route::delete('/items/{id}',[ItemController::class, 'destroy']);
});
