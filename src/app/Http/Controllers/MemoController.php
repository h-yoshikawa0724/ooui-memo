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
        $memos = Memo::where('user_id', $user->user_id)->orderBy(Memo::UPDATED_AT, 'desc')->paginate(50);

        return $memos;
    }

    /**
     * （ログインユーザの）メモ詳細取得API
     *
     * @param string $memo_id
     * @return \App\Memo
     */
    public function show(string $memo_id)
    {
        $memo = Memo::findOrFail($memo_id);

        $user = Auth::user();
        if ($memo->user_id !== $user->user_id) {
            return abort(404);
        };

        return $memo;
    }
}
