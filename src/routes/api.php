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
Route::get('/login/{provider}', 'Auth\OAuthController@getProviderOAuthURL')
            ->where('provider', 'github')->name('oauth.request');
Route::post('/login/{provider}/callback', 'Auth\OAuthController@handleProviderCallback')
            ->where('provider', 'github')->name('oauth.callback');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/users/me', 'UserController@show')->name('user');
Route::delete('/users/me', 'UserController@delete')->name('user.delete');

Route::get('/memos', 'MemoController@index')->name('memo.index');
Route::get('/memos/{memo_id}', 'MemoController@show')->name('memo.show');
Route::post('/memos', 'MemoController@create')->name('memo.create');
Route::patch('/memos/{memo_id}', 'MemoController@update')->name('memo.update');
Route::delete('/memos/{memo_id}', 'MemoController@delete')->name('memo.delete');
