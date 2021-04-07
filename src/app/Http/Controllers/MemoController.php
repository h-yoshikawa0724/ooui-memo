<?php

namespace App\Http\Controllers;

use App\Memo;
use App\Http\Requests\MemoRequest;
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
        $memos = Memo::where('user_id', $user->user_id)->orderBy(Memo::UPDATED_AT, 'desc')->paginate(30);

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

    /**
     * （ログインユーザで）メモ作成API
     *
     * @param MemoRequest $request
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function create(MemoRequest $request)
    {
        // パラメータは直接使うのでなく、フォームリクエストで加工したものを使う
        $memo = new Memo($request->validated());

        /** @var App\User $user */
        $user = Auth::user();
        $user->memos()->save($memo);

        return response($memo, 201);
    }

    /**
     * （ログインユーザで）メモ更新API
     *
     * @param MemoRequest $request
     * @param string $memo_id
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function update(MemoRequest $request, string $memo_id)
    {
        $memo = Memo::findOrFail($memo_id);

        $user = Auth::user();
        if ($memo->user_id !== $user->user_id) {
            return abort(404);
        };

        // パラメータは直接使うのでなく、フォームリクエストで加工したものを使う
        $memo->update($request->validated());

        return response($memo, 200);
    }

    /**
     * （ログインユーザで）メモ削除API
     *
     * @param string $memo_id
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function delete(string $memo_id)
    {
        $memo = Memo::findOrFail($memo_id);

        $user = Auth::user();
        if ($memo->user_id !== $user->user_id) {
            return abort(404);
        };

        $memo->delete();

        return response(null, 204);
    }
}
