<?php

namespace Tests\Feature;

use App\User;
use APP\Enums\AuthType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     * ユーザ新規登録できるか（メールアドレス認証）
     */
    public function testRegister()
    {
        $data = [
            'name' => 'ooui-memo user',
            'email' => 'dummy@email.com',
            'password' => 'test1234',
            'password_confirmation' => 'test1234',
        ];

        $response = $this->json('POST', route('register'), $data);

        $user = User::first();
        $this->assertEquals($data['name'], $user->name);
        $this->assertEquals(AuthType::MAIL, $user->auth_type);

        $response
            ->assertStatus(201)
            ->assertJson(['name' => $user->name, 'auth_type' => AuthType::MAIL, 'email_verified' => false]);
    }
}
