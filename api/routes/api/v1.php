<?php

use App\Http\Controllers\Api\V1\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\StudentProfileController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('sayhi', function() {
    return [
        'message' => 'hi'
    ];
})->middleware(['auth:api', 'role:admin']);

Route::group(['prefix' => 'auth'], function() {

    Route::post('login', [AuthController::class, 'login']);
    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('me', [AuthController::class, 'me']);
    });

});

// common actions
Route::group(['middleware' => ['auth:api']], function(){
    Route::put('users', [UserController::class, 'update']);
    Route::post('users/profile/picture', [UserController::class, 'uploadProfilePicture']);
});

// Admin actions only
Route::group(['middleware' => ['auth:api', 'role:admin']], function(){
    Route::apiResource('users', AdminUserController::class)->only('store', 'destroy', 'index');
});

// Student actions only
Route::group(['middleware' => ['auth:api', 'role:student']], function() {
    Route::get('profile', [StudentProfileController::class, 'index']);
    Route::put('profile', [StudentProfileController::class, 'update']);
});