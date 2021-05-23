<?php

namespace Tests\Feature;

use App\User;
use App\Memo;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserDeleteApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // ログインユーザー作成
        $this->authUser = factory(User::class)->create();
        $this->authUser->markEmailAsVerified();
        // 他のユーザ
        $this->user = factory(User::class)->create();
        $this->user->markEmailAsVerified();
    }

    /**
     * @test
     * ログインユーザ情報を削除できるか
     */
    public function testDeleteAuthUser()
    {
        factory(Memo::class, 6)->create(['user_id' => $this->authUser->user_id]);
        factory(Memo::class, 4)->create(['user_id' => $this->user->user_id]);

        $response = $this->actingAs($this->authUser)->json('DELETE', route('user.delete'));

        $user = User::find($this->authUser->user_id);
        $this->assertNull($user);
        // ログインユーザのメモデータも削除されているか
        $delete_memos = Memo::where('user_id', $this->authUser->user_id);
        $this->assertEquals(0, $delete_memos->count());
        // ログインユーザ以外のユーザのメモデータに影響がないか
        $memos = Memo::where('user_id', $this->user->user_id);
        $this->assertEquals(4, $memos->count());

        $response->assertStatus(204);
    }

    /**
     * @test
     * ログインしているが、非メール認証時は403を返すか
     */
    public function testDeleteAuthUserNotVerified()
    {
        $this->authUser->email_verified_at = null;

        $response = $this->actingAs($this->authUser)->json('DELETE', route('user.delete'));

        $response->assertStatus(403);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testDeleteAuthUserNotLogined()
    {
        $response = $this->json('DELETE', route('user.delete'));

        $response->assertStatus(401);
    }
}
