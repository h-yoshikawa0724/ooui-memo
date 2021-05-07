<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Socialite;

class OAuthController extends Controller
{
    /**
     * （各認証プロバイダーの）OAuth認証画面URL取得API
     * @param string $provider サービス名
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProviderOAuthURL(string $provider)
    {
        $redirectUrl = Socialite::driver($provider)->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }

    /**
     * ソーシャルログインAPI（各認証プロバイダーからのコールバック後）
     * @param string $provider サービス名
     * @return \Illuminate\Database\Eloquent\Model\User|App\User
     */
    public function handleProviderCallback(string $provider)
    {
        $providerUser = Socialite::driver($provider)->user();
        $authUser = User::socialFindOrCreate($providerUser, $provider);
        Auth::login($authUser, true);

        // ユーザ登録 + ログイン：201、ログインのみ：200
        return $authUser;
    }
}
