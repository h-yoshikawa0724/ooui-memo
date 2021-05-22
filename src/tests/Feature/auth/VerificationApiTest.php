<?php

namespace Tests\Feature;

use App\User;
use App\Notifications\VerifyEmail;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Config;
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
                'user_id' => '77193747-9a6b-4b35-a4eb-648fa9c0d1c2',
                'email' => 'sample4@mail.com',
                'email_verified_at' => null
            ]
        );
        $this->verifyEmail = new VerifyEmail();
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
}
