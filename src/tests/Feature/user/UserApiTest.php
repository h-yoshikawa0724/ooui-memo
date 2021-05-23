<?php

namespace Tests\Feature;

use App\User;
use APP\Enums\AuthType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * @test
     * ログインユーザ情報を取得できるか（BOTH）
     */
    public function testGetAuthUserForBoth()
    {
        $user = factory(User::class)->create(['auth_type' => AuthType::BOTH]);
        $user->markEmailAsVerified();

        $response = $this->actingAs($user)->json('GET', route('user'));

        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $user->name,
                'auth_type' => AuthType::BOTH,
                'email_verified' => true
            ]);
    }

    /**
     * @test
     * ログインユーザ情報を取得できるか（SOCIAL）
     */
    public function testGetAuthUserForSocial()
    {
        $user = factory(User::class)->create(['auth_type' => AuthType::SOCIAL, 'email_verified_at' => null]);

        $response = $this->actingAs($user)->json('GET', route('user'));

        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $user->name,
                'auth_type' => AuthType::SOCIAL,
                'email_verified' => true
            ]);
    }

    /**
     * @test
     * ログインユーザ情報を取得できるか（MAIL・メール認証済み）
     */
    public function testGetAuthUserForMail()
    {
        $user = factory(User::class)->create(['auth_type' => AuthType::MAIL]);
        $user->markEmailAsVerified();

        $response = $this->actingAs($user)->json('GET', route('user'));

        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $user->name,
                'auth_type' => AuthType::MAIL,
                'email_verified' => true
            ]);
    }

    /**
     * @test
     * ログインユーザ情報を取得できるか（MAIL・非メール認証）
     */
    public function testGetAuthUserForMailNotVerified()
    {
        $user = factory(User::class)->create(['auth_type' => AuthType::MAIL, 'email_verified_at' => null]);

        $response = $this->actingAs($user)->json('GET', route('user'));

        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $user->name,
                'auth_type' => AuthType::MAIL,
                'email_verified' => false
            ]);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testGetAuthUserNotLogined()
    {
        $response = $this->json('GET', route('user'));

        $response->assertStatus(401);
    }
}
