<?php

namespace Tests\Feature;

use App\User;
use APP\Enums\AuthType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * @test
     * ログインできるか（メール認証済み）
     */
    public function testLogin()
    {
        $user = factory(User::class)->create();
        $user->markEmailAsVerified();

        $response = $this->json('POST', route('login'), [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response
            ->assertStatus(200)
            ->assertJson(['name' => $user->name, 'auth_type' => AuthType::MAIL, 'email_verified' => true]);

        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     * ログインできるか（メール非認証）
     */
    public function testLoginNotVerified()
    {
        $user = factory(User::class)->create(['email_verified_at' => null]);

        $response = $this->json('POST', route('login'), [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response
            ->assertStatus(200)
            ->assertJson(['name' => $user->name, 'auth_type' => AuthType::MAIL, 'email_verified' => false]);

        $this->assertAuthenticatedAs($user);
    }
}
