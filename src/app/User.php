<?php

namespace App;

use App\Enums\AuthType;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use GoldSpecDigital\LaravelEloquentUUID\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'auth_type', 'email', 'password',
    ];

    /**
     * The attributes that should be visible for arrays.
     *
     * @var array
     */
    protected $visible = [
        'name', 'auth_type'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * リレーション - Memo
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function memos()
    {
        return $this->hasMany('App\Memo', 'user_id');
    }

    /**
     * リレーション - IdentityProviders
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function identityProviders()
    {
        return $this->hasMany('App\IdentityProvider', 'user_id');
    }

    /**
     * ソーシャルログイン処理
     * @param $providerUser プロバイダーユーザ情報
     * @param $provider プロバイダー名
     * @return \Illuminate\Database\Eloquent\Model\User|App\User
     */
    public static function socialFindOrCreate($providerUser, $provider)
    {
        $account = IdentityProvider::whereProviderName($provider)
                    ->whereProviderUserId($providerUser->getId())
                    ->first();

        if ($account) {
            // すでにアカウントがある場合は、そのユーザを返す
            return $account->user;
        } else {
            // アカウントがない場合は、ユーザ情報 + 認証プロバイダー情報を登録
            $user = DB::transaction(function () use ($providerUser, $provider) {
                // nameがない時もあるので、その時はnicknameを使う
                $providerUserName = $providerUser->getName() ? $providerUser->getName() : $providerUser->getNickname();
                $user = User::create([
                    'name'  => $providerUserName,
                    'auth_type' => AuthType::SOCIAL
                ]);
                $user->IdentityProviders()->create([
                    'provider_user_id'   => $providerUser->getId(),
                    'provider_name' => $provider,
                ]);

                return $user;
            });

            return $user;
        }
    }
}
