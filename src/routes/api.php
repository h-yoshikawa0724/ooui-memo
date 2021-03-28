<?php

use Illuminate\Http\Request;

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

Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/users/me', 'UserController@show')->name('user');

Route::get('/memos', 'MemoController@index')->name('memo.index');
Route::get('/memos/{memo_id}', 'MemoController@show')->name('memo.show');
Route::post('/memos', 'MemoController@create')->name('memo.create');
Route::patch('/memos/{memo_id}', 'MemoController@update')->name('memo.update');
