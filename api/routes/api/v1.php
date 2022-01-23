<?php

use App\Http\Controllers\Api\V1\Admin\ProfessorController;
use App\Http\Controllers\Api\V1\Admin\StudentController;
use App\Http\Controllers\Api\V1\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\CompanyController;
use App\Http\Controllers\Api\V1\InternshipController;
use App\Http\Controllers\Api\V1\InvitationController;
use App\Http\Controllers\Api\V1\StudentProfileController;
use App\Http\Controllers\Api\V1\TechnologyController;
use App\Http\Controllers\Api\V1\UserController;
use App\Models\Internship;
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

    // Comapnies 
    Route::get('companies', [CompanyController::class, 'index']);
    Route::post('companies', [CompanyController::class, 'store']);
    // Technologies
    Route::get('technologies', [TechnologyController::class,'index']);
    Route::post('technologies', [TechnologyController::class,'store']);
    Route::get('students', [StudentController::class, 'index']);
});

// Common actions between admin and prof
Route::group(['middleware' => ['auth:api', 'role:admin|professor']], function(){
    Route::get('internships', [InternshipController::class, 'index']);
    Route::get('internships/{internship}', [InternshipController::class, 'show']);
    Route::get('students/{user}', [StudentController::class, 'show']);
});

// Admin actions only
Route::group(['middleware' => ['auth:api', 'role:admin']], function(){
    Route::apiResource('users', AdminUserController::class)->only('store', 'destroy', 'index');
    

    Route::get('professors', [ProfessorController::class, 'index']);
    Route::get('professors/{user}', [ProfessorController::class, 'show']);

    // Companies
    Route::delete('companies/{company}', [CompanyController::class, 'destroy']);
    Route::put('companies/{company}', [CompanyController::class, 'update']);
    // Technologies
    Route::delete('technologies/{technology}', [TechnologyController::class, 'destroy']);
    Route::put('technologies/{technology}', [TechnologyController::class, 'update']);

});

// Student actions only
Route::group(['middleware' => ['auth:api', 'role:student']], function() {
    Route::get('profile', [StudentProfileController::class, 'index']);
    Route::put('profile', [StudentProfileController::class, 'update']);

    Route::post('internships', [InternshipController::class, 'store']);
    Route::put('internships', [InternshipController::class, 'update']);
    Route::post('internships/draft', [InternshipController::class, 'uploadDraft']);
    Route::post('internships/final', [InternshipController::class, 'uploadFinal']);
    Route::post('internships/presentation', [InternshipController::class, 'uploadPresentation']);

    Route::delete('internships/quit', [InternshipController::class, 'quit']);

    Route::post('invite/{user}', [InvitationController::class, 'store']);

    Route::delete('invitation/{invitation}', [InvitationController::class, 'destroy']);
    Route::put('invitation/{invitation}', [InvitationController::class, 'accept']);
});

// Proffesor actions only
Route::group(['middleware' => ['auth:api', 'role:professor']], function(){
    Route::put('internships/{internship}/supervise', [InternshipController::class, 'supervise']);
    Route::put('internships/{internship}/unsupervise', [InternshipController::class, 'unsupervise']);

    Route::put('internships/{internship}/valid', [InternshipController::class, 'valid']);
    Route::put('internships/{internship}/invalid', [InternshipController::class, 'invalid']);
    Route::put('internships/{internship}/score', [InternshipController::class, 'score']);
});