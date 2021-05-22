<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;

class VerifyEmail extends VerifyEmailBase
{
    /**
     * メール認証の確認URLを取得（API用）
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable)
    {
        $prefix = config('frontend.url') . config('frontend.email_verify_url');
        $routeName = 'verification.verify';
        $temporarySignedURL = URL::temporarySignedRoute(
            $routeName,
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'user_id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );

        return $prefix . urlencode($temporarySignedURL);
    }
}
