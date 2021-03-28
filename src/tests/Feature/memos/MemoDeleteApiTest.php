<?php

namespace Tests\Feature;

use App\Memo;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MemoDeleteApiTest extends TestCase
{
    use RefreshDatabase;

    private const DATE_TIME_FORMAT = 'Y-m-d H:i:s';

    public function setUp(): void
    {
        parent::setUp();

        // ログインユーザ
        $this->auth_user = factory(User::class)->create();
        // 他のユーザ
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     * メモ情報を削除できるか
     */
    public function testDeleteMemo()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->auth_user->user_id])->memo_id;

        $response = $this->actingAs($this->auth_user)
            ->json('DELETE', route('memo.delete', ['memo_id' => $memo_id]));

        $memo = Memo::find($memo_id);
        $this->assertNull($memo);

        $response->assertStatus(204);
    }

    /**
     * @test
     * 違うユーザのメモ情報を削除しようとすると404が返るか
     */
    public function testDeleteMemoOtherUser()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->user->user_id])->memo_id;

        $response = $this->actingAs($this->auth_user)
            ->json('DELETE', route('memo.delete', ['memo_id' => $memo_id]));

        $response->assertStatus(404);
    }

    /**
     * @test
     * 存在しないメモ情報を削除しようとすると404が返るか
     */
    public function testDeleteMemoNotExist()
    {
        $memo_id = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

        $response = $this->actingAs($this->auth_user)
            ->json('DELETE', route('memo.delete', ['memo_id' => $memo_id]));

        $response->assertStatus(404);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testDeleteMemoNotLogined()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->auth_user->user_id])->memo_id;

        $response = $this->json('DELETE', route('memo.delete', ['memo_id' => $memo_id]));

        $response->assertStatus(401);
    }
}
