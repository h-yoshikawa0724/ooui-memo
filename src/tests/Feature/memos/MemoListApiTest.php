<?php

namespace Tests\Feature;

use App\Memo;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MemoListApiTest extends TestCase
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
     * ログインユーザのメモ一覧情報を取得できるか
     */
    public function testGetMemoList()
    {
        factory(Memo::class, 6)->create(['user_id' => $this->auth_user->user_id]);
        factory(Memo::class, 4)->create(['user_id' => $this->user->user_id]);

        $response = $this->actingAs($this->auth_user)->json('GET', route('memo.index'));

        $memos = Memo::where('user_id', $this->auth_user->user_id)->orderBy('updated_at', 'desc')->get();

        // data項目の期待値
        $expected_data = $memos->map(function ($memo) {
            return [
                'memo_id' => $memo->memo_id,
                'title' => $memo->title,
                'content' => $memo->content,
                'created_at' => $memo->created_at->format(self::DATE_TIME_FORMAT),
                'updated_at' => $memo->updated_at->format(self::DATE_TIME_FORMAT),
            ];
        })
        ->all();

        $response->assertStatus(200)
            // レスポンスJSONのdata項目に含まれる要素が5つであること
            ->assertJsonCount(6, 'data')
            // レスポンスJSONのdata項目が期待値と合致すること
            ->assertJsonFragment([
                "data" => $expected_data,
            ]);
    }
}
