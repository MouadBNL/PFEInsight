<?php

use App\Http\Controllers\ExportController;
use Illuminate\Support\Facades\Route;

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
    return [
        'hello' => 'world'
    ];
});

Route::get('students/export', [ExportController::class, 'students']);

Route::get('/export', function () {
    $headers = [
        'Content-Type' => 'application/xls',
        'Content-Disposition' => 'attachement; filename=test.xls',
        "Pragma"              => "no-cache",
        "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
        "Expires"  
    ];
    return response()->view('export.test')
                ->header( 'Content-Type',           'application/xls')
                ->header( 'Content-Disposition',    'attachement; filename=test.xls')
                ->header( 'Pragma',                 'no-cache')
                ->header( 'Cache-Control',          'must-revalidate, post-check=0, pre-check=0')
                ->header( 'Expires',                '0');
});