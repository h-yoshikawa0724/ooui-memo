<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Socialite;

class OAuthController extends Controller
{
    /**
     * 各認証プロバイダーのOAuth認証画面にリダイレクトURL取得
     * @param string $provider サービス名
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function getProviderOAuthURL(string $provider)
    {
        return response()->json([
            'redirect_url' => Socialite::driver($provider)->redirect()->getTargetUrl(),
        ]);
    }

    /**
     * 各認証プロバイダーからのコールバック
     * @param string $provider サービス名
     * @return mixed
     */
    public function handleProviderCallback($provider)
    {
        // TODO あとで実装
    }
}
