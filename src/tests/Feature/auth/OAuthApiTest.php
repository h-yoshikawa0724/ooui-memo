<?php

namespace Tests\Feature;

use Mockery;
use Socialite;
use App\User;
use App\IdentityProvider;
use App\Enums\AuthType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

class OAuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        Mockery::getConfiguration()->allowMockingNonExistentMethods(false);

        $this->providerName = 'github';
        $this->params = [
            'code' => Str::random(20),
            'state' => Str::random(40)
        ];

        // モックを作成
        $this->user = Mockery::mock('Laravel\Socialite\Two\User');
        $this->user
            ->shouldReceive('getId')
            ->andReturn(uniqid())
            ->shouldReceive('getName')
            ->byDefault()
            ->andReturn('ooui-memo user')
            ->shouldReceive('getNickname')
            ->andReturn('@ooui-memo_user')
            ->shouldReceive('getEmail')
            ->andReturn('dummy@email.com');

        $this->provider = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $this->provider->shouldReceive('user')->byDefault()->andReturn($this->user);
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
     * ソーシャルログインAPIで
     * 認証プロバイダー（GitHub）のアカウントに紐づくユーザでログインできるか
     * （認証プロバイダー：登録あり、ユーザ：登録あり）
     */
    public function testLoginOAuthToGitHub()
    {
        Socialite::shouldReceive('driver')->with($this->providerName)->andReturn($this->provider);

        $user = factory(User::class)->create([
            'name' => $this->user->getName(),
            'auth_type' => AuthType::SOCIAL,
            'email' => $this->user->getEmail(),
            'password' => null
        ]);
        factory(IdentityProvider::class)->create([
            'user_id' => $user->user_id,
            'provider_user_id' => $this->user->getId(),
            'provider_name' => $this->providerName
        ]);

        $response = $this->json('POST', route('oauth.callback', ['provider' => $this->providerName], $this->params));

        $response
            ->assertStatus(200)
            ->assertJson(['name' => $user->name, 'auth_type' => AuthType::SOCIAL]);

        // ユーザが新しく作られていないか確認
        $this->assertCount(1, User::all());

        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     * ソーシャルログインAPIで
     * 認証プロバイダー（GitHub）のアカウントと同一メールアドレスユーザと紐づけ + ログインできるか
     * （認証プロバイダー：登録なし、ユーザ：登録あり・MAIL）
     */
    public function testRegisterAndLoginUserExistOAuthToGitHub()
    {
        Socialite::shouldReceive('driver')->with($this->providerName)->andReturn($this->provider);

        $existingUser = factory(User::class)->create([
            'auth_type' => AuthType::MAIL,
            'email' => $this->user->getEmail(),
        ]);

        $response = $this->json('POST', route('oauth.callback', ['provider' => $this->providerName], $this->params));

        $user = User::with('identityProviders')->first();
        $this->assertEquals($existingUser->name, $user->name);
        $this->assertEquals(AuthType::BOTH, $user->auth_type);
        $this->assertEquals($existingUser->email, $user->email);
        $this->assertEquals($existingUser->password, $user->password);
        $this->assertEquals($this->user->getId(), $user->identityProviders[0]->provider_user_id);
        $this->assertEquals($this->providerName, $user->identityProviders[0]->provider_name);

        $response
            ->assertStatus(200)
            ->assertJson(['name' => $existingUser->name, 'auth_type' => AuthType::BOTH]);

        // ユーザが新しく作られていないか確認
        $this->assertCount(1, User::all());

        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     * ソーシャルログインAPIで
     * 認証プロバイダー（GitHub）のアカウントでユーザ登録 + ログインできるか（nameがある）
     * （認証プロバイダー：登録なし、ユーザ：登録なし）
     */
    public function testRegisterAndLoginOAuthToGitHub()
    {
        Socialite::shouldReceive('driver')->with($this->providerName)->andReturn($this->provider);

        $response = $this->json('POST', route('oauth.callback', ['provider' => $this->providerName], $this->params));

        $user = User::with('identityProviders')->first();
        $this->assertEquals($this->user->getName(), $user->name);
        $this->assertEquals(AuthType::SOCIAL, $user->auth_type);
        $this->assertEquals($this->user->getEmail(), $user->email);
        $this->assertNull($user->password);
        $this->assertEquals($this->user->getId(), $user->identityProviders[0]->provider_user_id);
        $this->assertEquals($this->providerName, $user->identityProviders[0]->provider_name);

        $response
            ->assertStatus(201)
            ->assertJson(['name' => $this->user->getName(), 'auth_type' => AuthType::SOCIAL]);

        $this->assertAuthenticatedAs($user);
    }

     /**
     * @test
     * ソーシャルログインAPIで
     * 認証プロバイダー（GitHub）のアカウントでユーザ登録 + ログインできるか（nameがない）
     * （認証プロバイダー：登録なし、ユーザ：登録なし）
     */
    public function testRegisterAndLoginOAuthToGitHubNotName()
    {
        $this->user->shouldReceive('getName')->andReturn('');
        Socialite::shouldReceive('driver')->with($this->providerName)->andReturn($this->provider);

        $response = $this->json('POST', route('oauth.callback', ['provider' => $this->providerName], $this->params));

        $user = User::with('identityProviders')->first();
        $this->assertEquals($this->user->getNickname(), $user->name);
        $this->assertEquals(AuthType::SOCIAL, $user->auth_type);
        $this->assertEquals($this->user->getEmail(), $user->email);
        $this->assertNull($user->password);
        $this->assertEquals($this->user->getId(), $user->identityProviders[0]->provider_user_id);
        $this->assertEquals($this->providerName, $user->identityProviders[0]->provider_name);

        // nameがない時はnicknameで登録できているか確認
        $response
            ->assertStatus(201)
            ->assertJson(['name' => $this->user->getNickname(), 'auth_type' => AuthType::SOCIAL]);

        $this->assertAuthenticatedAs($user);
    }

    /**
     * @test
     * ソーシャルログインAPIで、認証プロバイダーからユーザ情報取得時にエラーになった時は500になるか
     */
    public function testLoginOAuthToProviderError()
    {
        $this->provider->shouldReceive('user')->andThrow(new \Exception('test', 500, null));
        Socialite::shouldReceive('driver')->with($this->providerName)->andReturn($this->provider);

        $response = $this->json('POST', route('oauth.callback', ['provider' => $this->providerName], $this->params));

        $response
            ->assertStatus(500)
            ->assertJson(['message' => 'test']);

        $this->assertGuest();
    }

    /**
     * @test
     * ソーシャルログインAPIで、パスパラメータの認証プロバイダーの値が制約外の場合は404が返るか
     */
    public function testLoginOAuthToProviderNotFound()
    {
        $response = $this->json('POST', route('oauth.callback', ['provider' => 'test'], $this->params));

        $response->assertStatus(404);

        $this->assertGuest();
    }
}
