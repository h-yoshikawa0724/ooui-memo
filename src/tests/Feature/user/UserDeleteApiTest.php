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
        $this->auth_user = factory(User::class)->create();
        // 他のユーザ
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     * ログインユーザ情報を削除できるか
     */
    public function testDeleteAuthUser()
    {
        factory(Memo::class, 6)->create(['user_id' => $this->auth_user->user_id]);
        factory(Memo::class, 4)->create(['user_id' => $this->user->user_id]);

        $response = $this->actingAs($this->auth_user)->json('DELETE', route('user.delete'));

        $user = User::find($this->auth_user->user_id);
        $this->assertNull($user);
        // ログインユーザのメモデータも削除されているか
        $delete_memos = Memo::where('user_id', $this->auth_user->user_id);
        $this->assertEquals(0, $delete_memos->count());
        // ログインユーザ以外のユーザのメモデータに影響がないか
        $memos = Memo::where('user_id', $this->user->user_id);
        $this->assertEquals(4, $memos->count());

        $response->assertStatus(204);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testDeleteAuthUserNotLogined()
    {
        $response = $this->json('GET', route('user.delete'));

        $response->assertStatus(401);
    }
}
