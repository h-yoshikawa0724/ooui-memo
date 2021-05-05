<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function PHPUnit\Framework\assertEquals;

class OAuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->providerName = 'github';
    }

    /**
     * @test
     * 認証プロバイダ（GitHub）の認証画面を表示できるか
     */
    public function testOAuthRequestToGitHub()
    {
        $response = $this->json('GET', route('oauth.request', ['provider' => $this->providerName]));

        $response->assertStatus(200);
        $target = parse_url($response->json('redirect_url'));

        // リダイレクト先ドメインの検証
        $this->assertEquals('github.com', $target['host']);

        // パラメータの検証
        $query = explode('&', $target['query']);
        $this->assertContains('client_id=' . config('services.github.client_id'), $query);
        $this->assertContains('redirect_uri=' . urlencode(config('services.github.redirect')), $query);
    }

     /**
     * @test
     * 認証プロバイダ（GitHub）のアカウントでユーザ登録できるか
     */
    public function testRegisterOAuthToGitHub()
    {
        $response = $this->json('GET', route('oauth.callback', ['provider' => $this->providerName]));

        $response
            ->assertStatus(200);
    }
}
