<?php

namespace Tests\Feature;

use Mockery;
use Socialite;
use App\User;
use App\IdentityProvider;
use App\Enums\AuthType;
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

        Mockery::getConfiguration()->allowMockingNonExistentMethods(false);

        $this->providerName = 'github';

        // モックを作成
        $this->user = Mockery::mock('Laravel\Socialite\Two\User');
        $this->user
            ->shouldReceive('getId')
            ->andReturn(uniqid())
            ->shouldReceive('getName')
            ->andReturn('ooui-memo user');

        $this->provider = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $this->provider->shouldReceive('user')->andReturn($this->user);
    }

    public static function tearDownAfterClass(): void
    {
        // Mockeryの設定をもとに戻す
        Mockery::getConfiguration()->allowMockingNonExistentMethods(true);
    }

    /**
     * @test
     * 認証プロバイダー（GitHub）のOAuth認証画面URLを取得できるか
     */
    public function testRequestOAuthToGitHub()
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
     * OAuth認証画面URL取得APIで、パスパラメータの認証プロバイダーの値が制約外の場合は404が返るか
     */
    public function testRequestOAuthToGitHubNotFound()
    {
        $response = $this->json('GET', route('oauth.request', ['provider' => 'test']));

        $response->assertStatus(404);
    }

     /**
     * @test
     * 認証プロバイダー（GitHub）のアカウントでユーザ登録 + ログインできるか
     */
    public function testRegisterAndLoginOAuthToGitHub()
    {
        Socialite::shouldReceive('driver')->with($this->providerName)->andReturn($this->provider);

        $response = $this->json('POST', route('oauth.callback', ['provider' => $this->providerName]));

        $response
            ->assertStatus(201)
            ->assertJson(['name' => $this->user->getName()]);


        $user = User::with('identityProviders')->first();
        $this->assertEquals($this->user->getName(), $user->name);
        $this->assertEquals(AuthType::SOCIAL, $user->auth_type);
        $this->assertEquals($this->user->getId(), $user->identityProviders[0]->provider_user_id);
        $this->assertEquals($this->providerName, $user->identityProviders[0]->provider_name);

        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     * 認証プロバイダー（GitHub）のアカウントに紐づくユーザでログインできるか
     */
    public function testLoginOAuthToGitHub()
    {
        Socialite::shouldReceive('driver')->with($this->providerName)->andReturn($this->provider);

        $user = factory(User::class)->create(['name' => $this->user->getName(), 'auth_type' => AuthType::SOCIAL]);
        factory(IdentityProvider::class)->create([
            'user_id' => $user->user_id,
            'provider_user_id' => $this->user->getId(),
            'provider_name' => $this->providerName
        ]);

        $response = $this->json('POST', route('oauth.callback', ['provider' => $this->providerName]));

        $response
            ->assertStatus(200)
            ->assertJson(['name' => $user->name, 'auth_type' => AuthType::SOCIAL]);

        $this->assertCount(1, User::all());

        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     * ソーシャルログインAPIで、パスパラメータの認証プロバイダーの値が制約外の場合は404が返るか
     */
    public function testLoginOAuthToGitHubNotFound()
    {
        $response = $this->json('POST', route('oauth.callback', ['provider' => 'test']));

        $response->assertStatus(404);
    }
}
