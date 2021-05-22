<?php

namespace Tests\Feature;

use App\User;
use App\Notifications\VerifyEmail;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\InteractsWithTime;
use DateTimeInterface;

class VerificationApiTest extends TestCase
{
    use RefreshDatabase;
    use InteractsWithTime;

    private function availableAt($delay = 0)
    {
        $delay = $this->parseDateInterval($delay);

        return $delay instanceof DateTimeInterface
                            ? $delay->getTimestamp()
                            : Carbon::now()->addRealSeconds($delay)->getTimestamp();
    }

    public function setUp(): void
    {
        parent::setUp();

        // テストユーザー作成
        $this->user = factory(User::class)->create(
            [
                'email_verified_at' => null
            ]
        );
    }

    /**
     * @test
     * メール認証APIでメール認証できるか
     */
    public function testVerification()
    {
        $user_id = $this->user->user_id;
        $routeName = 'verification.verify';

        $verifyEmailApiUrl = URL::temporarySignedRoute(
            $routeName,
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'user_id' => $this->user->getKey(),
                'hash' => sha1($this->user->getEmailForVerification()),
            ]
        );
        $apiQuery = parse_url($verifyEmailApiUrl, PHP_URL_QUERY);
        parse_str($apiQuery, $queryArr);

        $response = $this->json('GET', route(
            $routeName,
            [
                'user_id' => $user_id,
                'expires' => $queryArr['expires'],
                'hash' => $queryArr['hash'],
                'signature' => $queryArr['signature']
            ]
        ));

        $user = User::find($this->user->user_id);
        $this->assertNotNull($user->email_verified_at);

        $response->assertStatus(200)
                ->assertSee('メール認証を確認しました');
    }

    /**
     * @test
     * メール認証APIでメール認証がすでに済の場合は202が返るか
     */
    public function testVerificationVerified()
    {
        $this->user->markEmailAsVerified();
        $user_id = $this->user->user_id;
        $routeName = 'verification.verify';

        $verifyEmailApiUrl = URL::temporarySignedRoute(
            $routeName,
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'user_id' => $this->user->getKey(),
                'hash' => sha1($this->user->getEmailForVerification()),
            ]
        );
        $apiQuery = parse_url($verifyEmailApiUrl, PHP_URL_QUERY);
        parse_str($apiQuery, $queryArr);

        $response = $this->json('GET', route(
            $routeName,
            [
                'user_id' => $user_id,
                'expires' => $queryArr['expires'],
                'hash' => $queryArr['hash'],
                'signature' => $queryArr['signature']
            ]
        ));

        $user = User::find($this->user->user_id);
        $this->assertEquals($this->user->email_verified_at, $user->email_verified_at);

        $response->assertStatus(202)
                ->assertSee('すでにメール認証確認済みです');
    }

    /**
     * @test
     * メール認証APIでsignature不一致の場合は403になるか
     */
    public function testVerificationNotMatchSignature()
    {
        $user_id = $this->user->user_id;
        $routeName = 'verification.verify';

        $verifyEmailApiUrl = URL::temporarySignedRoute(
            $routeName,
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'user_id' => $this->user->getKey(),
                'hash' => sha1($this->user->getEmailForVerification()),
            ]
        );
        $apiQuery = parse_url($verifyEmailApiUrl, PHP_URL_QUERY);
        parse_str($apiQuery, $queryArr);

        $response = $this->json('GET', route(
            $routeName,
            [
                'user_id' => $user_id,
                'expires' => $queryArr['expires'],
                'hash' => $queryArr['hash'],
                'signature' => Str::random(64)
            ]
        ));

        $user = User::find($this->user->user_id);
        $this->assertNull($user->email_verified_at);

        $response->assertStatus(403);
    }

    /**
     * @test
     * メール認証APIで存在しないユーザに対してのリクエストの場合は404が返るか
     */
    public function testVerificationNotUser()
    {
        User::destroy($this->user->user_id);
        $user_id = $this->user->user_id;
        $routeName = 'verification.verify';

        $verifyEmailApiUrl = URL::temporarySignedRoute(
            $routeName,
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'user_id' => $this->user->getKey(),
                'hash' => sha1($this->user->getEmailForVerification()),
            ]
        );
        $apiQuery = parse_url($verifyEmailApiUrl, PHP_URL_QUERY);
        parse_str($apiQuery, $queryArr);

        $response = $this->json('GET', route(
            $routeName,
            [
                'user_id' => $user_id,
                'expires' => $queryArr['expires'],
                'hash' => $queryArr['hash'],
                'signature' => $queryArr['signature']
            ]
        ));

        $response->assertStatus(404);
    }

    /**
     * @test
     * メール再送信APIでメールが再送信されるか
     */
    public function testVerifyMailResend()
    {
        // 実際にはメールを送らないように設定
        Notification::fake();

        // メールが送られていないことを確認
        Notification::assertNothingSent();

        $otherUser = factory(User::class)->create();

        $response = $this->actingAs($this->user)->json('POST', route(
            'verification.resend',
        ));

        // メッセージが指定したユーザーに届いたことを確認
        Notification::assertSentTo($this->user, VerifyEmail::class);

        // 他のユーザに届いてないか確認
        Notification::assertNotSentTo(
            [$otherUser],
            VerifyEmail::class
        );

        $response->assertStatus(204)
                 ->assertSee('認証用メールを再送信しました');
    }

    /**
     * @test
     * メール再送信APIですでにメール認証済みの場合は202になるか
     */
    public function testVerifyMailResendVerified()
    {
        $this->user->markEmailAsVerified();
        Notification::fake();
        Notification::assertNothingSent();

        $response = $this->actingAs($this->user)->json('POST', route(
            'verification.resend',
        ));

        Notification::assertNothingSent();

        $response->assertStatus(202)
                 ->assertSee('すでにメール認証確認済みです');
    }

    /**
     * @test
     * メール再送信APIで非ログインの場合は401になるか
     */
    public function testVerifyMailResendNotLogin()
    {
        Notification::fake();
        Notification::assertNothingSent();

        $response = $this->json('POST', route(
            'verification.resend',
        ));

        Notification::assertNothingSent();

        $response->assertStatus(401);
    }
}
