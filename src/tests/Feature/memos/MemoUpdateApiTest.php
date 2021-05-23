<?php

namespace Tests\Feature;

use App\Memo;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MemoUpdateApiTest extends TestCase
{
    use RefreshDatabase;

    private const DATE_TIME_FORMAT = 'Y-m-d H:i:s';

    public function setUp(): void
    {
        parent::setUp();

        // ログインユーザ
        $this->authUser = factory(User::class)->create();
        $this->authUser->markEmailAsVerified();
        // 他のユーザ
        $this->user = factory(User::class)->create();
        $this->user->markEmailAsVerified();
    }

    /**
     * @test
     * メモ情報を更新できるか
     */
    public function testPatchMemo()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->authUser->user_id])->memo_id;

        $data = [
            'title' => 'テスト メモタイトル更新',
            'content' => 'テスト メモ内容更新'
        ];

        $response = $this->actingAs($this->authUser)
            ->json('PATCH', route('memo.update', ['memo_id' => $memo_id]), $data);

        $memo = Memo::find($memo_id);
        $this->assertEquals($this->authUser->user_id, $memo->user_id);
        $this->assertEquals($data['title'], $memo->title);
        $this->assertEquals($data['content'], $memo->content);

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
     * 空文字パラメータの時、メモ情報を更新できるか
     *
     * 空文字パラメータは、API側で受け取るとConvertEmptyStringsToNullミドルウェアによりnullに変換される
     * それをフォームリクエストで空文字に再変換して保存しているので、そのテスト
     */
    public function testPatchMemoNullData()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->authUser->user_id])->memo_id;

        $data = [
            'title' => '',
            'content' => ''
        ];

        $response = $this->actingAs($this->authUser)
            ->json('PATCH', route('memo.update', ['memo_id' => $memo_id]), $data);

        $memo = Memo::find($memo_id);
        $this->assertEquals($this->authUser->user_id, $memo->user_id);
        $this->assertEquals($data['title'], $memo->title);
        $this->assertEquals($data['content'], $memo->content);

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
     * 違うユーザのメモ情報を更新しようとすると404が返るか
     */
    public function testPatchMemoOtherUser()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->user->user_id])->memo_id;

        $data = [
            'title' => 'テスト メモタイトル更新',
            'content' => 'テスト メモ内容更新'
        ];

        $response = $this->actingAs($this->authUser)
            ->json('PATCH', route('memo.update', ['memo_id' => $memo_id]), $data);

        $response->assertStatus(404);
    }

    /**
     * @test
     * 存在しないメモ情報を更新しようとすると404が返るか
     */
    public function testPatchMemoNotExist()
    {
        $memo_id = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

        $data = [
            'title' => 'テスト メモタイトル更新',
            'content' => 'テスト メモ内容更新'
        ];

        $response = $this->actingAs($this->authUser)
            ->json('PATCH', route('memo.update', ['memo_id' => $memo_id]), $data);

        $response->assertStatus(404);
    }

    /**
     * @test
     * バリデーションエラー時は422になるか
     */
    public function testPatchMemoValidate()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->authUser->user_id])->memo_id;

        $data = [
            'title' => str_repeat('a', 101),
            'content' => str_repeat('a', 65536)
        ];

        $response = $this->actingAs($this->authUser)
            ->json('PATCH', route('memo.update', ['memo_id' => $memo_id]), $data);

        $response->assertStatus(422);
    }

    /**
     * @test
     * ログインしているが、非メール認証時は403を返すか
     */
    public function testPatchMemoNotVerified()
    {
        $this->authUser->email_verified_at = null;
        $memo_id = factory(Memo::class)->create(['user_id' => $this->authUser->user_id])->memo_id;

        $data = [
            'title' => 'テスト メモタイトル更新',
            'content' => 'テスト メモ内容更新'
        ];

        $response = $this->actingAs($this->authUser)
                         ->json('PATCH', route('memo.update', ['memo_id' => $memo_id]), $data);

        $response->assertStatus(403);
    }

    /**
     * @test
     * ログインしていない時は401を返すか
     */
    public function testPatchMemoNotLogined()
    {
        $memo_id = factory(Memo::class)->create(['user_id' => $this->authUser->user_id])->memo_id;

        $data = [
            'title' => 'テスト メモタイトル更新',
            'content' => 'テスト メモ内容更新'
        ];

        $response = $this->json('PATCH', route('memo.update', ['memo_id' => $memo_id]), $data);

        $response->assertStatus(401);
    }
}
