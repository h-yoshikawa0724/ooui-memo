<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * 現在ログインしているユーザ情報取得
     *
     * @return \App\User|null
     */
    public function show()
    {
        return Auth::user();
    }
}
