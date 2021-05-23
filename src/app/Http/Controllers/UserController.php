<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * 現在ログインしているユーザ情報取得
     *
     * @return \App\User|null
     */
    public function show()
    {
        return Auth::user();
    }

    /**
     * （ログインユーザで）ユーザ削除API
     *
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function delete(Request $request)
    {
        /** @var App\User $user */
        $user = Auth::user();
        $user->delete();

        // セッションを再生成する
        $request->session()->regenerate();

        return response(null, 204);
    }
}
