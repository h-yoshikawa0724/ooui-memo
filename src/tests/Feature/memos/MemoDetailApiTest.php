<?php

namespace Tests\Feature;

use App\Memo;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MemoDetailApiTest extends TestCase
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
     * メモ詳細情報を取得できるか
     */
    public function testGetMemoDetail()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->auth_user->user_id])->memo_id;

        $response = $this->actingAs($this->auth_user)->json('GET', route('memo.show', ['memo_id' => $memo_id]));

        $memo = Memo::find($memo_id)->where('user_id', $this->auth_user->user_id)->first();

        $response->assertStatus(200)
            ->assertJson([
                'memo_id' => $memo->memo_id,
                'title' => $memo->title,
                'content' => $memo->content,
                'created_at' => $memo->created_at->format(self::DATE_TIME_FORMAT),
                'updated_at' => $memo->updated_at->format(self::DATE_TIME_FORMAT),
            ]);
    }

    /**
     * @test
     * 違うユーザのメモ詳細情報を取得しようとすると404が返るか
     */
    public function testGetMemoDetailOtherUser()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->user->user_id])->memo_id;

        $response = $this->actingAs($this->auth_user)->json('GET', route('memo.show', ['memo_id' => $memo_id]));

        $response->assertStatus(404);
    }

    /**
     * @test
     * 存在しないメモ詳細情報を取得しようとすると404が返るか
     */
    public function testGetMemoDetailNotExist()
    {
        $memo_id = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

        $response = $this->actingAs($this->auth_user)->json('GET', route('memo.show', ['memo_id' => $memo_id]));

        $response->assertStatus(404);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testGetMemoDetailNotLogined()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->auth_user->user_id])->memo_id;

        $response = $this->json('GET', route('memo.show', ['memo_id' => $memo_id]));

        $response->assertStatus(401);
    }
}
