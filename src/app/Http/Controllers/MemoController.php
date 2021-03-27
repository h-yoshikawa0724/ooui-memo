<?php

namespace App\Http\Controllers;

use App\Memo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemoController extends Controller
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
     * （ログインユーザの）メモ一覧取得API
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function index()
    {
        $user = Auth::user();
        $memos = Memo::where('user_id', $user->user_id)->orderBy(Memo::UPDATED_AT, 'desc')->paginate();

        return $memos;
    }
}
