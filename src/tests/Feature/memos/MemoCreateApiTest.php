<?php

namespace Tests\Feature;

use App\Memo;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MemoCreateApiTest extends TestCase
{
    use RefreshDatabase;

    private const DATE_TIME_FORMAT = 'Y-m-d H:i:s';

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
        $this->user->markEmailAsVerified();
    }

    /**
     * @test
     * メモ情報を新規作成できるか
     */
    public function testPostMemo()
    {
        $data = [
            'title' => 'テスト メモタイトル',
            'content' => 'テスト メモ内容'
        ];

        $response = $this->actingAs($this->user)->json('POST', route('memo.create'), $data);

        $memo = Memo::first();
        $this->assertEquals($this->user->user_id, $memo->user_id);
        $this->assertEquals($data['title'], $memo->title);
        $this->assertEquals($data['content'], $memo->content);

        $response->assertStatus(201)
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
     * 空文字パラメータの時、メモ情報を新規作成できるか
     *
     * 空文字パラメータは、API側で受け取るとConvertEmptyStringsToNullミドルウェアによりnullに変換される
     * それをフォームリクエストで空文字に再変換して保存しているので、そのテスト
     */
    public function testPostMemoNullData()
    {
        $data = [
            'title' => '',
            'content' => ''
        ];

        $response = $this->actingAs($this->user)->json('POST', route('memo.create'), $data);

        $memo = Memo::first();
        $this->assertEquals($this->user->user_id, $memo->user_id);
        $this->assertEquals($data['title'], $memo->title);
        $this->assertEquals($data['content'], $memo->content);

        $response->assertStatus(201)
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
     * バリデーションエラー時は422になるか
     */
    public function testPostMemoValidate()
    {
        $data = [
            'title' => str_repeat('a', 101),
            'content' => str_repeat('a', 65536)
        ];

        $response = $this->actingAs($this->user)->json('POST', route('memo.create'), $data);

        $response->assertStatus(422);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testPostMemoNotLogined()
    {
        $data = [
            'title' => 'テスト メモタイトル',
            'content' => 'テスト メモ内容'
        ];

        $response = $this->json('POST', route('memo.create'), $data);

        $response->assertStatus(401);
    }
}
