<?php

namespace App;

use App\Enums\AuthType;
use App\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use GoldSpecDigital\LaravelEloquentUUID\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable implements MustVerifyEmail
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
        'name', 'auth_type', 'email_verified',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'email_verified',
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
     * ユーザーのメール認証有無を取得（ソーシャルログインでもメール認証済みとする）
     *
     * @return bool
     */
    public function getEmailVerifiedAttribute()
    {
        if (
            $this->attributes['auth_type'] === AuthType::BOTH
            || $this->attributes['auth_type'] === AuthType::SOCIAL
        ) {
            return true;
        }

        return isset($this->attributes['email_verified_at']);
    }

    /**
     * メール確認通知送信（API用）
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail());
    }

    /**
     * ソーシャルログイン処理
     * @param $providerUser プロバイダーユーザ情報
     * @param $provider プロバイダー名
     * @return App\User
     */
    public static function socialFindOrCreate($providerUser, $provider)
    {
        $account = IdentityProvider::whereProviderName($provider)
                    ->whereProviderUserId($providerUser->getId())
                    ->first();

        // すでにアカウントがある場合は、そのユーザを返す
        if ($account) {
            return $account->user;
        }

        $existingUser = User::whereEmail($providerUser->getEmail())->first();

        if ($existingUser) {
            // メールアドレスはユニークの関係上、同一メールアドレスユーザがいる場合は、そのユーザと紐づけて認証プロバイダー情報登録
            $user = DB::transaction(function () use ($existingUser, $providerUser, $provider) {
                $existingUser->update(['auth_type' => AuthType::BOTH]);
                $existingUser->IdentityProviders()->create([
                    'provider_user_id'   => $providerUser->getId(),
                    'provider_name' => $provider,
                ]);

                return $existingUser;
            });
        } else {
            // アカウントがない場合は、ユーザ情報 + 認証プロバイダー情報を登録
            $user = DB::transaction(function () use ($providerUser, $provider) {
                // nameがない時もあるので、その時はnicknameを使う
                $providerUserName = $providerUser->getName() ? $providerUser->getName() : $providerUser->getNickname();
                $user = User::create([
                    'name'  => $providerUserName,
                    'auth_type' => AuthType::SOCIAL,
                    'email' => $providerUser->getEmail(),
                ]);
                $user->IdentityProviders()->create([
                    'provider_user_id'   => $providerUser->getId(),
                    'provider_name' => $provider,
                ]);

                return $user;
            });
        }

        return $user;
    }
}
